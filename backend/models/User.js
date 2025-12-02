import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email-ul este obligatoriu"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Format email invalid",
      },
    },

    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      minlength: [6, "Parola trebuie sa aiba minimum 6 caractere"],
    },

    name: {
      type: String,
      required: [true, "Numele este obligatoriu"],
      trim: true,
      maxlength: [100, "Numele nu poate depasi 100 de caractere"],
    },

    provider: {
      type: String,
      enum: ["local", "auth0"],
      default: "local",
    },

    auth0Id: {
      type: String,
      sparse: true, // permite valori nule unice
    },

    userType: {
      type: String,
      enum: ["student", "profesor"],
      required: [true, "Tipul de utilizator este obligatoriu"],
    },
    // Detalii specifice studenti
    studentDetails: {
      universityId: {
        type: String,
        required: function () {
          return this.userType === "student" && this.profileComplete === true;
        },
      },
      faculty: {
        type: String,
        required: function () {
          return this.userType === "student" && this.profileComplete === true;
        },
      },
      year: {
        type: Number,
        min: 1,
        max: 6,
        required: function () {
          return this.userType === "student" && this.profileComplete === true;
        },
      },
      specialization: {
        type: String,
        required: function () {
          return this.userType === "student" && this.profileComplete === true;
        },
      },
    },

    // Detalii specifice profesori
    professorDetails: {
      department: {
        type: String,
        required: function () {
          return this.userType === "profesor" && this.profileComplete === true;
        },
      },
      title: {
        type: String,
        enum: ["Lect. Dr.", "Conf. Dr.", "Prof. Dr.", "Asist. Dr."],
        required: function () {
          return this.userType === "profesor" && this.profileComplete === true;
        },
      },
      researchAreas: [
        {
          type: String,
        },
      ],
      bio: {
        type: String,
        maxlength: [1000, "Bio-ul nu poate depăși 1000 de caractere"],
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    profileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// index pentru cautari rapide
userSchema.index({ email: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ "studentDetails.universityId": 1 });
userSchema.index({ "professorDetails.department": 1 });

// middleware pre-save pentru validarea email-ului pe baza domeniului
userSchema.pre("save", async function () {
  if (this.isNew || this.isModified("email")) {
    const emailValidation = validateEmailDomain(this.email);

    if (!emailValidation.isValid) {
      throw new Error("Email-ul trebuie sa fie de la o universitate acceptata");
    }

    this.userType = emailValidation.userType;
  }
});

function validateEmailDomain(email) {
  const studentDomains = [
    "@stud.ase.ro",
    "@student.ase.ro",
    "@student.upt.ro",
    "@student.utcluj.ro",
    "@stud.ubbcluj.ro",
    "@student.upb.ro",
  ];

  const professorDomains = [
    "@ase.ro",
    "@ie.ase.ro",
    "@profesor.ase.ro",
    "@upt.ro",
    "@utcluj.ro",
    "@ubbcluj.ro",
    "@upb.ro",
  ];

  const emailLower = email.toLowerCase();

  for (const domain of studentDomains) {
    if (emailLower.endsWith(domain)) {
      return { isValid: true, userType: "student" };
    }
  }

  for (const domain of professorDomains) {
    if (emailLower.endsWith(domain)) {
      return { isValid: true, userType: "profesor" };
    }
  }

  return { isValid: false, userType: null };
}

// Metoda pentru verificarea parolei (pentru bcrypt)
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;

  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(candidatePassword, this.password);
};

// Metoda pentru generarea unui obiect user sigur (fara parola)
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

export { validateEmailDomain };

export default mongoose.model("User", userSchema);
