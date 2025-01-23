import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  CreditCard,
  FileText,
  LogIn,
  Menu,
  QrCode,
  User,
  Video,
  X,
  Upload,
  Download,
  CreditCard as CardIcon,
  UserCog,
  Stethoscope,
  CheckCircle,
  Clock
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showDoctorSignUp, setShowDoctorSignUp] = useState(false);
  const [showOrderCard, setShowOrderCard] = useState(false);
  const [formData, setFormData] = useState({
    bloodType: '',
    allergies: '',
    lastConsultation: '',
    lastIllness: '',
    prescribedProducts: '',
  });

  const [doctorFormData, setDoctorFormData] = useState({
    fullName: '',
    speciality: '',
    experience: '',
    phone: '',
    email: '',
  });

  const [cardOrderData, setCardOrderData] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDoctorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDoctorFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCardOrderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setShowSignUp(false);
  };

  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(doctorFormData);
    setShowDoctorSignUp(false);
  };

  const handleCardOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(cardOrderData);
    setShowOrderCard(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">MEDILINK</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Consultation Médicale</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Responsabilités</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Renouvellement</a>
              <button 
                onClick={() => setShowSignUp(true)}
                className="btn-primary flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                S'inscrire
              </button>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Consultation Médicale</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Responsabilités</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Renouvellement</a>
              <button 
                onClick={() => setShowSignUp(true)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                S'inscrire
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Votre Santé, Notre Priorité
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Accédez à des soins de qualité où que vous soyez grâce à notre plateforme de télésanté sécurisée.
            </p>
            <div className="space-x-4">
              <button 
                className="btn-primary"
                onClick={() => setShowSignUp(true)}
              >
                Commencer
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowDoctorSignUp(true)}
              >
                Devenir Médecin Consultant
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
              alt="Consultation médicale"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Teleconsultation Section */}
        <div className="card mb-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Démarrez Votre Téléconsultation</h2>
              <p className="mb-4">Connectez-vous instantanément avec des professionnels de santé</p>
            </div>
            <button className="bg-white text-blue-600 btn-primary hover:bg-gray-100">
              <Video className="inline-block w-5 h-5 mr-2" />
              Démarrer la Consultation
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card hover:shadow-lg transition-shadow">
            <User className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Profil Personnel</h3>
            <p className="text-gray-600">
              Gérez votre historique médical, vos allergies et vos ordonnances en un seul endroit sécurisé.
            </p>
          </div>
          <div className="card hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowOrderCard(true)}>
            <QrCode className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Carte Médicale QR</h3>
            <p className="text-gray-600">
              Commandez votre carte personnelle avec QR code pour un accès rapide à vos informations médicales.
            </p>
            <button className="btn-primary mt-4">
              Commander ma Carte
            </button>
          </div>
          <div className="card hover:shadow-lg transition-shadow">
            <FileText className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Dossiers Numériques</h3>
            <p className="text-gray-600">
              Accédez et gérez vos documents médicaux à tout moment.
            </p>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="card mb-12">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <h2 className="text-2xl font-bold mb-2">Accès Premium aux Soins de Santé</h2>
              <p className="text-gray-600 mb-4">Consultations illimitées pour 1000 unités/mois</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <CardIcon className="text-blue-600 w-8 h-8" />
                  <span>Carte Bancaire</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://wave.com/assets/images/wave-logo.svg" alt="Wave" className="w-16 h-8 object-contain" />
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://www.orange.com/sites/all/themes/custom/o_theme/logo.svg" alt="Orange Money" className="w-16 h-8 object-contain" />
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://moov-africa.com/wp-content/themes/moov-africa/assets/images/moov-africa-logo.svg" alt="Moov Money" className="w-16 h-8 object-contain" />
                </div>
              </div>
            </div>
            <button className="btn-primary mt-4 sm:mt-0">
              S'abonner Maintenant
            </button>
          </div>
        </div>

        {/* Medical Records Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Dossiers Médicaux Récents</h3>
                <p className="text-gray-600">Accédez à vos derniers documents médicaux</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <Download className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Dernier Rapport de Consultation</span>
                <Download className="w-4 h-4 text-blue-600 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>Ordonnance Récente</span>
                <Download className="w-4 h-4 text-blue-600 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Votre Code QR Médical</h3>
                <p className="text-gray-600">Accès rapide à vos informations médicales</p>
              </div>
            </div>
            <div className="flex justify-center">
              <QrCode className="w-32 h-32 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Sign Up Modal */}
        {showSignUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Créer Votre Profil Médical</h2>
                <button 
                  onClick={() => setShowSignUp(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Groupe Sanguin
                  </label>
                  <select 
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner le groupe sanguin</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Listez vos allergies..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de Dernière Consultation
                  </label>
                  <input
                    type="date"
                    name="lastConsultation"
                    value={formData.lastConsultation}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dernière Maladie
                  </label>
                  <input
                    type="text"
                    name="lastIllness"
                    value={formData.lastIllness}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Entrez votre dernière maladie"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Produits Prescrits
                  </label>
                  <textarea
                    name="prescribedProducts"
                    value={formData.prescribedProducts}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Listez les médicaments prescrits..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Télécharger l'Ordonnance
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Télécharger un fichier</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF jusqu'à 10MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowSignUp(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Créer le Profil
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Doctor Sign Up Modal */}
        {showDoctorSignUp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Devenir Médecin Consultant</h2>
                <button 
                  onClick={() => setShowDoctorSignUp(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleDoctorSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={doctorFormData.fullName}
                    onChange={handleDoctorInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Dr. Nom Prénom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spécialité
                  </label>
                  <select
                    name="speciality"
                    value={doctorFormData.speciality}
                    onChange={handleDoctorInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une spécialité</option>
                    <option value="generaliste">Médecin Généraliste</option>
                    <option value="cardiologue">Cardiologue</option>
                    <option value="pediatre">Pédiatre</option>
                    <option value="dermatologue">Dermatologue</option>
                    <option value="psychiatre">Psychiatre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Années d'Expérience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={doctorFormData.experience}
                    onChange={handleDoctorInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={doctorFormData.phone}
                    onChange={handleDoctorInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+XXX XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Professionnel
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={doctorFormData.email}
                    onChange={handleDoctorInputChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="docteur@exemple.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diplômes et Certifications
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="diploma-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Télécharger les documents</span>
                          <input id="diploma-upload" name="diploma-upload" type="file" className="sr-only" multiple />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF uniquement, max 10MB par fichier
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowDoctorSignUp(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Soumettre la Candidature
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Order QR Card Modal */}
        {showOrderCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Commander Votre Carte QR Médicale</h2>
                <button 
                  onClick={() => setShowOrderCard(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCardOrderSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={cardOrderData.fullName}
                    onChange={handleCardOrderChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse de Livraison
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={cardOrderData.address}
                    onChange={handleCardOrderChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Votre adresse complète"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={cardOrderData.city}
                    onChange={handleCardOrderChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Votre ville"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={cardOrderData.phone}
                    onChange={handleCardOrderChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="+XXX XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Méthode de Paiement
                  </label>
                  <select
                    name="paymentMethod"
                    value={cardOrderData.paymentMethod}
                    onChange={handleCardOrderChange}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner une méthode de paiement</option>
                    <option value="wave">Wave</option>
                    <option value="orange">Orange Money</option>
                    <option value="moov">Moov Money</option>
                    <option value="card">Carte Bancaire</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Prix de la carte</span>
                    <span>5000 unités</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Frais de livraison</span>
                    <span>1000 unités</span>
                  </div>
                  <div className="flex justify-between items-center font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>6000 unités</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowOrderCard(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Commander
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Activity className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-bold text-blue-600">MEDILINK</span>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 MEDILINK. Tous droits réservés.
            </div>
          </div>
         </div>
        </div>
      </footer>
    </div>
  );
}

export default App;