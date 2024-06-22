import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "./../redux/authSlice.js";
import PropTypes from "prop-types";
function EditNameModal({ user, token, onClose }) {
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedUser = { firstName, lastName };
    dispatch(updateUserProfile({ userData: updatedUser, token }))
      .unwrap()
      .then((updatedUserData) => {
        console.log("Profile updated", updatedUserData);
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update profile", error);
      });
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-inputs">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
      </div>
      <div className="edit-modal-buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default EditNameModal;

EditNameModal.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
