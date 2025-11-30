import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileCompletion = () => {
  const { user, userType, completeProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State pentru student
  const [studentData, setStudentData] = useState({
    universityId: '',
    faculty: '',
    year: '',
    specialization: ''
  });

  // State pentru profesor
  const [professorData, setProfessorData] = useState({
    department: '',
    title: '',
    researchAreas: [''],
    bio: ''
  });

  const handleStudentChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleProfessorChange = (e) => {
    setProfessorData({ ...professorData, [e.target.name]: e.target.value });
  };

  const handleResearchAreaChange = (index, value) => {
    const newAreas = [...professorData.researchAreas];
    newAreas[index] = value;
    setProfessorData({ ...professorData, researchAreas: newAreas });
  };

  const addResearchArea = () => {
    setProfessorData({ 
      ...professorData, 
      researchAreas: [...professorData.researchAreas, ''] 
    });
  };

  const removeResearchArea = (index) => {
    const newAreas = professorData.researchAreas.filter((_, i) => i !== index);
    setProfessorData({ ...professorData, researchAreas: newAreas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const profileData = userType === 'student' ? studentData : {
        ...professorData,
        researchAreas: professorData.researchAreas.filter(area => area.trim() !== '')
      };

      const result = await completeProfile(profileData);
      
      if (result.success) {
        // Profil completat cu succes
        navigate('/');
      } else {
        setError(result.message || 'Eroare la completarea profilului');
      }
    } catch (err) {
      setError('Eroare la server.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container" style={{ maxWidth: '600px' }}>
      <h2>Completează-ți profilul</h2>
      <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#666' }}>
        Salut <strong>{user.name}</strong>! Pentru a continua, completează-ți profilul de {userType === 'student' ? 'student' : 'profesor'}.
      </p>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        {userType === 'student' ? (
          // Formular pentru student
          <>
            <div className="form-group">
              <label>ID Student / Număr matricol:</label>
              <input
                type="text"
                name="universityId"
                value={studentData.universityId}
                onChange={handleStudentChange}
                required
                placeholder="ex: 123456"
              />
            </div>

            <div className="form-group">
              <label>Facultatea:</label>
              <input
                type="text"
                name="faculty"
                value={studentData.faculty}
                onChange={handleStudentChange}
                required
                placeholder="ex: Facultatea de Informatică Economică"
              />
            </div>

            <div className="form-group">
              <label>Anul de studiu:</label>
              <select
                name="year"
                value={studentData.year}
                onChange={handleStudentChange}
                required
              >
                <option value="">Selectează anul</option>
                <option value="1">Anul I</option>
                <option value="2">Anul II</option>
                <option value="3">Anul III</option>
                <option value="4">Anul IV (Master I)</option>
                <option value="5">Anul V (Master II)</option>
                <option value="6">Anul VI (Doctorat)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Specializarea:</label>
              <input
                type="text"
                name="specialization"
                value={studentData.specialization}
                onChange={handleStudentChange}
                required
                placeholder="ex: Informatică Economică"
              />
            </div>
          </>
        ) : (
          // Formular pentru profesor
          <>
            <div className="form-group">
              <label>Departament/Catedra:</label>
              <input
                type="text"
                name="department"
                value={professorData.department}
                onChange={handleProfessorChange}
                required
                placeholder="ex: Catedra de Informatică Economică"
              />
            </div>

            <div className="form-group">
              <label>Titlul academic:</label>
              <select
                name="title"
                value={professorData.title}
                onChange={handleProfessorChange}
                required
              >
                <option value="">Selectează titlul</option>
                <option value="Asist. Dr.">Asist. Dr.</option>
                <option value="Lect. Dr.">Lect. Dr.</option>
                <option value="Conf. Dr.">Conf. Dr.</option>
                <option value="Prof. Dr.">Prof. Dr.</option>
              </select>
            </div>

            <div className="form-group">
              <label>Domenii de cercetare:</label>
              {professorData.researchAreas.map((area, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => handleResearchAreaChange(index, e.target.value)}
                    placeholder="ex: Machine Learning, Baze de date"
                    style={{ flex: 1 }}
                  />
                  {professorData.researchAreas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResearchArea(index)}
                      style={{ 
                        background: '#e74c3c', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        padding: '8px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addResearchArea}
                style={{ 
                  background: '#3498db', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px', 
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                + Adaugă domeniu
              </button>
            </div>

            <div className="form-group">
              <label>Bio/Descriere scurtă (opțional):</label>
              <textarea
                name="bio"
                value={professorData.bio}
                onChange={handleProfessorChange}
                placeholder="O scurtă descriere despre tine, experiența ta..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#f9f9f9',
                  resize: 'vertical'
                }}
              />
            </div>
          </>
        )}

        <button 
          type="submit" 
          className="btn-primary"
          disabled={loading}
          style={{
            marginTop: '1rem',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Se completează...' : 'Completează profilul'}
        </button>
      </form>
    </div>
  );
};

export default ProfileCompletion;
