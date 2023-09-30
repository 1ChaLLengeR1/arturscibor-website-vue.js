export default {
  loadArrayJobs(state) {
    return state.arrayJobs;
  },
  loadArrayJobsName(state) {
    const array = [];
    for (const key of state.arrayJobs) {
      array.push(key.name);
    }
    return array;
  },
  loadInformationMe(state) {
    return state.informationMe;
  },
  loadImagesPortfolio(state) {
    return state.imagesMe;
  },
  loadImagesPortfolioLinks(state) {
    const array = [];
    for (const key of state.imagesMe) {
      array.push(key.link);
    }
    return array;
  },
  loadInformationAboutMe(state) {
    return state.informationAboutMe;
  },
  loadReadMore(state) {
    return state.loadReadMore;
  },
  loadTools(state){
    return state.loadTools
  },
  loadProjects(state){
    return state.loadProjects
  },
  loadProject(state){
    return state.loadProject
  },
  loadMessage(state){
    return state.message
  }
};
