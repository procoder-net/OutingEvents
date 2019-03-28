import UserProfile from "../entity/UserProfile";
import connectORM from "./../connection";

/**
 *
 * @param userInformation {first_name, last_name, email, username, password}
 */
export function createUserProfile(userInformation: any) {
  const userProfile = new UserProfile();
  userProfile.email = userInformation.email;
  userProfile.username = userInformation.username;
  userProfile.password = userInformation.password;
  userProfile.first_name = userInformation.first_name;
  userProfile.last_name = userInformation.last_name;
  return connectORM.getRepository(UserProfile).save(userProfile);
}

export function getUserProfileById(userId: number) {
  return connectORM
    .getRepository(UserProfile)
    .findOne(userId)
    .catch((err: any) => {
      throw err;
    });
}

export function getAllUserProfiles() {
  return connectORM
    .getRepository(UserProfile)
    .find()
    .then(profiles => {
      console.log(profiles);
      return profiles;
    })
    .catch((err: any) => {
      throw err;
    });
}

export function updateUserInformation() {}
