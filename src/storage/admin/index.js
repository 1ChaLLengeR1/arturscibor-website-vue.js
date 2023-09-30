import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
        arrayJobs: [],
        informationMe: {
          id: null,
          information: null
        },
        imagesMe: [],
        informationAboutMe:{
          id: '',
          name: '',
          job: '',
          information: '',
          path_image: '',
          link_image: '',
        },
        loadReadMore:[],
        loadTools:[],
        loadProjects: [],
        loadProject:{
          id: '',
          name_project:'',
          description: '',
          file_image:{
            path:'',
            link:''
          },
          completion_data: '',
          project_number:'',
          level_advanced: '',
          link_page:'',
          technologies:[],
          images_frontend:[],
          images_backend:[],
          file_download:{
            name:'',
            path:'',
            link:''
          }
        },
        message: []
    };
  },
  mutations: mutations,
  actions: actions,
  getters: getters,
};
