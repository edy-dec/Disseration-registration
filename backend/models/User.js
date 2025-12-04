import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Format email invalid'
      },
      notEmpty: {
        msg: 'Email-ul este obligatoriu'
      }
    },
    set(value) {
      this.setDataValue('email', value.toLowerCase().trim());
    }
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true, // Poate fi null pentru Auth0 users
    validate: {
      len: {
        args: [6, 255],
        msg: 'Parola trebuie sa aiba minimum 6 caractere'
      },
      isRequiredForLocal() {
        if (this.provider === 'local' && !this.password) {
          throw new Error('Parola este obligatorie pentru înregistrarea locala');
        }
      }
    }
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Numele este obligatoriu'
      },
      len: {
        args: [1, 100],
        msg: 'Numele nu poate depasi 100 de caractere'
      }
    },
    set(value) {
      this.setDataValue('name', value.trim());
    }
  },

  provider: {
    type: DataTypes.ENUM('local', 'auth0'),
    defaultValue: 'local'
  },

  auth0Id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },

  userType: {
    type: DataTypes.ENUM('student', 'profesor'),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Tipul de utilizator este obligatoriu'
      }
    }
  },

  // Student details - salvate ca JSON
  studentDetails: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isValidStudentDetails() {
        if (this.userType === 'student' && this.profileComplete) {
          const details = this.studentDetails;
          if (!details || !details.universityId || !details.faculty || 
              !details.year || !details.specialization) {
            throw new Error('Detaliile de student sunt incomplete');
          }
          if (details.year < 1 || details.year > 6) {
            throw new Error('Anul trebuie să fie între 1 și 6');
          }
        }
      }
    }
  },

  // Professor details - salvate ca JSON
  professorDetails: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isValidProfessorDetails() {
        if (this.userType === 'profesor' && this.profileComplete) {
          const details = this.professorDetails;
          if (!details || !details.department || !details.title) {
            throw new Error('Detaliile de profesor sunt incomplete');
          }
          const validTitles = ['Lect. Dr.', 'Conf. Dr.', 'Prof. Dr.', 'Asist. Dr.'];
          if (!validTitles.includes(details.title)) {
            throw new Error('Titlul profesorului nu este valid');
          }
          if (details.bio && details.bio.length > 1000) {
            throw new Error('Bio-ul nu poate depăși 1000 de caractere');
          }
        }
      }
    }
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  profileComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'users',  indexes: [
    {
      fields: ['email']
    },
    {
      fields: ['user_type'] // Sequelize convertește userType în user_type cu underscored: true
    },
    {
      fields: ['auth0_id'], // Similar pentru auth0Id
      unique: true,
      where: {
        auth0_id: {
          [sequelize.Sequelize.Op.ne]: null
        }
      }
    }
  ],
  hooks: {
    beforeSave: async (user) => {
      // Validare email domain și setare userType
      if (user.changed('email')) {
        const emailValidation = validateEmailDomain(user.email);
        if (!emailValidation.isValid) {
          throw new Error('Email-ul trebuie sa fie de la o universitate acceptata');
        }
        user.userType = emailValidation.userType;
      }

      // Hash password pentru local users
      if (user.changed('password') && user.password && user.provider === 'local') {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Metoda pentru validarea domeniului email-ului
function validateEmailDomain(email) {
  const studentDomains = [
    '@stud.ase.ro',
    '@student.ase.ro',
    '@student.upt.ro',
    '@student.utcluj.ro',
    '@stud.ubbcluj.ro',
    '@student.upb.ro'
  ];

  const professorDomains = [
    '@ase.ro',
    '@ie.ase.ro',
    '@profesor.ase.ro',
    '@upt.ro',
    '@utcluj.ro',
    '@ubbcluj.ro',
    '@upb.ro'
  ];

  const emailLower = email.toLowerCase();

  for (const domain of studentDomains) {
    if (emailLower.endsWith(domain)) {
      return { isValid: true, userType: 'student' };
    }
  }

  for (const domain of professorDomains) {
    if (emailLower.endsWith(domain)) {
      return { isValid: true, userType: 'profesor' };
    }
  }

  return { isValid: false, userType: null };
}

// Instance methods
User.prototype.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

User.prototype.toSafeObject = function() {
  const userObject = this.toJSON();
  delete userObject.password;
  return userObject;
};

export { validateEmailDomain };
export default User;
