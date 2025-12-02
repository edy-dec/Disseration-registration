// Middleware pentru verificarea tipului de utilizator
export const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
   
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Autentificare necesara'
      });
    }
    
    // Verifica daca utilizatorul are unul din rolurile permise
    if (!allowedRoles.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: `Acces interzis. Aceasta functionalitate este disponibila doar pentru: ${allowedRoles.join(', ')}`
      });
    }
    
    next();
  };
};

// Middleware specific pentru studenti
export const studentOnly = roleCheck('student');

// Middleware specific pentru profesori
export const professorOnly = roleCheck('profesor');

// Middleware pentru verificarea unui profil complet
export const requireCompleteProfile = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Autentificare necesara'
    });
  }
  
  if (!req.user.profileComplete) {
    return res.status(400).json({
      success: false,
      message: 'Profilul trebuie completat inainte de a accesa aceasta functionalitate',
      redirectTo: '/complete-profile'
    });
  }
  
  next();
};
