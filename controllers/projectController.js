const projects = require("../models/projectModel");

//ADD PROJECTS
exports.addProjectController = async (req, res) => {
  console.log("INSIDE ADD PROJECT CONTROLLER");
  const userId = req.userId;

  console.log(userId);
  console.log(req.body);
  console.log(req.file);

  const { title, languages, overview, github, website } = req.body;
  const projectImage = req.file.filename;

  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project Already Exists ! Please Upload another.");
    } else {
      const newProject = new projects({
        title,
        languages,
        overview,
        github,
        website,
        projectImage,
        userId,
      });
      await newProject.save();
      res.status(200).json(`Project Added Successfully ! ${newProject}`);
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//GET HOME PROJECTS
exports.getHomeProjectsController = async (req, res) => {
  console.log("INSIDE GET HOME PROJECTS CONTROLLER");
  try {
    const allHomeProjects = await projects.find().limit(3);
    res.status(200).json(allHomeProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};

//GET USER PROJECTS - AUTHORISED USER
exports.getUserProjectsController = async (req, res) => {
  console.log("INSIDE GET USER PROJECTS CONTROLLER");
  const userId = req.userId;
  try {
    const allUserProjects = await projects.find({ userId });
    res.status(200).json(allUserProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};

//GET ALL PROJECTS - AUTHORISED USER
exports.getAllProjectsController = async (req, res) => {
  console.log("INSIDE GET ALL PROJECTS CONTROLLER");
  const searchKey = req.query.search;
  const query = {
    languages: {
      $regex: searchKey,
      $options: "i",
    },
  };
  try {
    const allProjects = await projects.find(query);
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};

//EDIT PROJECT
exports.editProjectController = async (req, res) => {
  console.log("INSIDE EDIT PROJECT CONTROLLER");

  const { id } = req.params;
  const { title, languages, overview, github, website, projectImage } = req.body;
  //TO GET FILE DATA - REQ-FILE
  const reUploadImageFileName = req.file?req.file.filename:projectImage
  const userId = req.userId
  console.log(id,title,languages,overview,github,website,reUploadImageFileName,userId);
  try {
    const updatedProject = await projects.findByIdAndUpdate({_id:id},{
        title,languages,overview,github,website,projectImage:reUploadImageFileName,userId
    },{new:true})
    await updatedProject.save()
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(401).json(err)
  }
};

//REMOVE PROJECT
exports.removeProjectController = async (req, res) => {
  console.log("INSIDE REMOVE PROJECT CONTROLLER");
  //GET THE ID OF THE PROJECT WANT TO REMOVE BY REQ PARAMS
  const { id } = req.params;
  //DELETE PROJECT BY GIVEN ID
  try {
    const removeProject = await projects.findByIdAndDelete({_id:id})
    res.status(200).json(removeProject);
  } catch (error) {
    res.status(401).json(error)
  }
}
