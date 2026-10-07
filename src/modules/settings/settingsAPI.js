const settingsAPI = {
  getProfile: async (client) => {
    return client.get("/profile");
  },

  changePassword: async (
    client,
    {
      currentPassword,
      newPassword,
    }
  ) => {
    return client.post(
      "/change-password",
      {
        current_password:
          currentPassword,
        new_password:
          newPassword,
      }
    );
  },
};

export default settingsAPI;