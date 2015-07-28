dataFiles = new FS.Collection("dataFiles", {
    stores: [new FS.Store.FileSystem("dataFiles", {path: "../../../private/user_data"})]
});