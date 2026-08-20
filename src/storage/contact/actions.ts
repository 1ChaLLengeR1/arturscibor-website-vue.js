import type { ActionTree } from "vuex";
import { getContactCollection } from "../../api/admin/contact/get";
import { deleteContact } from "../../api/admin/contact/post";
import { createContact } from "../../api/contact/post";
import type { ContactCollectionQuery, ContactCreatePayload } from "../../api/contact/types";
import { notifyError, notifySuccess } from "../common/notify";
import type { RootState } from "../common/types";
import type { ContactState } from "./state";

const actions: ActionTree<ContactState, RootState> = {
  async apiCreateContact({ commit }, payload: ContactCreatePayload) {
    const result = await createContact(payload);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Wiadomość wysłana.");
  },

  async apiGetContactCollection({ commit }, query?: ContactCollectionQuery) {
    const result = await getContactCollection(query);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    commit("setCollection", result.data ?? []);
  },

  async apiDeleteContact({ commit, dispatch }, contactId: string) {
    const result = await deleteContact(contactId);
    if (result.status === "ERROR") {
      notifyError(commit, result.data.message);
      return;
    }
    notifySuccess(commit, "Usunięto wiadomość.");
    await dispatch("apiGetContactCollection");
  },
};

export default actions;
