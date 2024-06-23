import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../apiServices";
import EditNameModal from "./../components/EditNameModal.jsx";

/**
 * Composant Dashboard affichant les informations de l'utilisateur et les détails des comptes.
 * Gère l'état pour l'édition du nom de l'utilisateur et récupère les données du profil utilisateur.
 *
 * @component
 * @returns {JSX.Element} Le composant Dashboard rendu.
 */
function Dashboard() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Hook useEffect pour récupérer le profil utilisateur lorsque le token est disponible et que les données utilisateur ne sont pas chargées.
   */
  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token, user]);

  /**
   * Gère l'événement de clic pour ouvrir la modal d'édition du nom.
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Gère l'événement pour fermer la modal d'édition du nom.
   */
  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="header">
        <h1>Welcome Back</h1>
        {isEditing ? (
          <EditNameModal user={user} token={token} onClose={handleCloseModal} />
        ) : (
          <>
            <h1>{user ? `${user.firstName} ${user.lastName}` : "Guest"}!</h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
