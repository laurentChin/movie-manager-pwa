module.exports = shipit => {
  require("shipit-deploy")(shipit);
  require("shipit-shared")(shipit);

  shipit.initConfig({
    default: {
      deployTo: "/var/www/movie-manager/pwa",
      repositoryUrl: "https://github.com/laurentChin/movie-manager-pwa.git",
      shared: {
        overwrite: true,
        files: ["./.env"]
      }
    },
    production: {
      servers: "laurent@kimsufi",
      key: "~/.ssh/id_rsa.pub"
    }
  });

  shipit.on("updated", () => {
    shipit.start("install");
  });

  shipit.blTask("install", async () => {
    await shipit.remote(`cd ${shipit.releasePath} && yarn install`);
    await shipit.remote(`cd ${shipit.releasePath} && yarn run build`);
    await shipit.remote(`chmod +x ${shipit.releasePath}`);
  });
};
