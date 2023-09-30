export default {
  loadArrayJobs(state, payload) {
    state.arrayJobs = [];
    for (const key of payload) {
      state.arrayJobs.push(key);
    }
  },
  loadInformationMe(state, payload) {
    state.informationMe = {
      id: payload[0].id,
      information: payload[0].information,
    };
  },
  loadImagesPortfolio(state, payload) {
    state.imagesMe = [];
    for (const key of payload) {
      state.imagesMe.push(key);
    }
  },
  loadInformationAboutMe(state, payload) {
    state.informationAboutMe = {
      id: payload[0].id,
      name: payload[0].name,
      job: payload[0].job,
      information: payload[0].information,
      path_image: payload[0].path_image,
      link_image: payload[0].link_image,
    };
  },
  loadReadMore(state, payload) {
    state.loadReadMore = [];
    for (const key of payload) {
      state.loadReadMore.push(key);
    }
  },
  loadTools(state, payload) {
    state.loadTools = [];
    for (const key of payload) {
      state.loadTools.push(key);
    }
  },
  loadProjects(state, payload) {
    state.loadProjects = [];
    for (const key of payload) {
      state.loadProjects.push(key);
    }
  },
  loadProject(state, payload) {
    state.loadProject = {
      id: payload.id,
      name_project: payload.name_project,
      short_description: payload.short_description,
      file_image: {
        path: payload.file_image.path,
        link: payload.file_image.link,
      },
      description: payload.description,
      completion_data: payload.completion_data,
      project_number: payload.project_number,
      level_advanced: payload.level_advanced,
      link_page: payload.link_page,
      technologies: payload.technologies,
      images_frontend: payload.images_frontend,
      images_backend: payload.images_backend,
      file_download: {
        id: payload.file_download.id,
        name: payload.file_download.name,
        path: payload.file_download.path,
        link: payload.file_download.link,
      },
      
    };
  },
  loadMessage(state, payload){
    state.message = []
    for(const key of payload){
      state.message.push(key)
    }
  }
};
