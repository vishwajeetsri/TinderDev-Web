import React from "react";

const UserCard = ({ user }) => {
  if (!user) return <div>Loading...</div>;
  console.log(user);
  return (
    <div className="card bg-base-300 w-96 shadow-2xl">
      <figure className="object-fill">
        <img className="w-[85%] h-auto mt-2 " src={user.photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
         <p>{user.age + " " + user.gender}</p>
        <p>{user.about}</p>
        <div className="card-actions justify-center mt-2 ">
          <button className="btn btn-primary px-10 mr-2">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
