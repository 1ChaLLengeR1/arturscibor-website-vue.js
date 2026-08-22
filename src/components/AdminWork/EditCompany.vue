<template>
  <div class="edit__company__container">
    <div class="close__container">
      <svg
        @click="closePanel"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>

    <form class="edit__company__box" @submit.prevent="saveCompany">
      <h3>Firma</h3>
      <v-text-field
        bg-color="white"
        label="Nazwa firmy"
        v-model="form.company_name"
      ></v-text-field>
      <v-text-field
        type="number"
        bg-color="white"
        label="Kolejność wyświetlania"
        v-model="form.numeric"
      ></v-text-field>
      <v-btn @click="saveCompany" color="blue">Zapisz zmiany</v-btn>

      <h3>Logo</h3>
      <div class="logo__preview" v-if="resolveFileUrl(work?.logo_url)">
        <img :src="resolveFileUrl(work.logo_url)" alt="logo firmy" />
        <v-btn color="black" @click="removeLogo">Usuń logo</v-btn>
      </div>
      <UploadFile
        accept="image/*"
        label="Załaduj logo!"
        buttonLabel="Zaktualizuj logo"
        @upload="uploadLogo"
      ></UploadFile>

      <h3>Stanowiska ({{ language.toUpperCase() }})</h3>
      <ul class="items__list">
        <li class="item" v-for="item in itemsForm" :key="item.id">
          <v-text-field
            bg-color="white"
            :label="`Stanowisko (${language.toUpperCase()})`"
            v-model="item.title"
          ></v-text-field>
          <v-select
            bg-color="white"
            label="Rodzaj zatrudnienia"
            clearable
            :items="EMPLOYMENT_TYPE_OPTIONS"
            v-model="item.employment_type"
          ></v-select>
          <v-text-field
            bg-color="white"
            :label="`Lokalizacja (${language.toUpperCase()})`"
            v-model="item.location"
          ></v-text-field>
          <div class="dates">
            <v-text-field
              type="date"
              bg-color="white"
              label="Od"
              class="input__info"
              v-model="item.date_from"
            ></v-text-field>
            <v-text-field
              type="date"
              bg-color="white"
              label="Do"
              class="input__info"
              v-model="item.date_to"
            ></v-text-field>
          </div>
          <v-textarea
            variant="filled"
            :label="`Opis (${language.toUpperCase()})`"
            auto-grow
            bg-color="white"
            v-model="item.body_markdown"
          ></v-textarea>
          <v-text-field
            bg-color="white"
            label="Umiejętności (oddzielone przecinkiem)"
            v-model="item.skills"
          ></v-text-field>
          <div class="item__actions">
            <v-btn color="blue" @click="updateItem(item)">Zapisz stanowisko</v-btn>
            <v-btn color="black" @click="deleteItem(item.id)">Usuń stanowisko</v-btn>
          </div>
        </li>
      </ul>

      <h3>Dodaj stanowisko</h3>
      <div class="new__item">
        <v-text-field
          bg-color="white"
          label="Stanowisko (PL)"
          v-model="newItem.title_pl"
        ></v-text-field>
        <v-text-field
          bg-color="white"
          label="Stanowisko (EN)"
          v-model="newItem.title_en"
        ></v-text-field>
        <v-select
          bg-color="white"
          label="Rodzaj zatrudnienia"
          clearable
          :items="EMPLOYMENT_TYPE_OPTIONS"
          v-model="newItem.employment_type"
        ></v-select>
        <v-text-field
          bg-color="white"
          label="Lokalizacja (PL)"
          v-model="newItem.location_pl"
        ></v-text-field>
        <v-text-field
          bg-color="white"
          label="Lokalizacja (EN)"
          v-model="newItem.location_en"
        ></v-text-field>
        <div class="dates">
          <v-text-field
            type="date"
            bg-color="white"
            label="Od"
            class="input__info"
            v-model="newItem.date_from"
          ></v-text-field>
          <v-text-field
            type="date"
            bg-color="white"
            label="Do"
            class="input__info"
            v-model="newItem.date_to"
          ></v-text-field>
        </div>
        <v-textarea
          variant="filled"
          label="Opis (PL)"
          auto-grow
          bg-color="white"
          v-model="newItem.body_markdown_pl"
        ></v-textarea>
        <v-textarea
          variant="filled"
          label="Opis (EN)"
          auto-grow
          bg-color="white"
          v-model="newItem.body_markdown_en"
        ></v-textarea>
        <v-text-field
          bg-color="white"
          label="Umiejętności (oddzielone przecinkiem)"
          v-model="newItem.skills"
        ></v-text-field>
        <v-btn color="green" @click="addItem" :disabled="!canAddItem">
          Dodaj stanowisko
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import { resolveFileUrl } from "../../utils/url";
import UploadFile from "../util/UploadFile.vue";

const EMPLOYMENT_TYPE_OPTIONS = [
  { title: "Pełny etat", value: "full_time" },
  { title: "Część etatu", value: "part_time" },
  { title: "Kontrakt", value: "contract" },
  { title: "B2B", value: "b2b" },
  { title: "Staż", value: "internship" },
  { title: "Wolontariat", value: "volunteer" },
];

const splitSkills = (value) =>
  value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

const toMultiLang = (pl, en) => {
  const plVal = (pl ?? "").trim();
  const enVal = (en ?? "").trim();
  if (!plVal && !enVal) return null;
  return { pl: plVal || enVal, en: enVal || plVal };
};

export default {
  components: {
    UploadFile,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  emits: ["close-edit-company"],
  setup(props, { emit }) {
    const store = useStore();

    const work = computed(() =>
      store.getters["work/collection"].find((item) => item.id === props.id)
    );

    const form = reactive({
      company_name: "",
      numeric: null,
    });
    const itemsForm = reactive([]);
    const newItem = reactive({
      title_pl: "",
      title_en: "",
      employment_type: null,
      location_pl: "",
      location_en: "",
      date_from: "",
      date_to: "",
      body_markdown_pl: "",
      body_markdown_en: "",
      skills: "",
    });

    watch(
      work,
      (newVal) => {
        if (!newVal) return;
        form.company_name = newVal.company_name;
        form.numeric = newVal.numeric;
        itemsForm.splice(
          0,
          itemsForm.length,
          ...newVal.items.map((item) => ({
            id: item.id,
            title: item.title ?? "",
            employment_type: item.employment_type,
            location: item.location ?? "",
            date_from: item.date_from ?? "",
            date_to: item.date_to ?? "",
            body_markdown: item.body_markdown ?? "",
            skills: (item.skills ?? []).join(", "),
          }))
        );
      },
      { immediate: true }
    );

    const canAddItem = computed(
      () => newItem.title_pl.trim() !== "" && newItem.title_en.trim() !== ""
    );

    const closePanel = () => {
      emit("close-edit-company", false);
    };

    const saveCompany = () => {
      if (form.company_name.trim() === "") return;
      store.dispatch("work/apiUpdateWork", {
        workId: props.id,
        payload: {
          company_name: form.company_name.trim(),
          numeric: form.numeric === null || form.numeric === "" ? null : Number(form.numeric),
        },
      });
    };

    const uploadLogo = (file) => {
      store.dispatch("work/apiUploadWorkLogo", { workId: props.id, file });
    };

    const removeLogo = () => {
      store.dispatch("work/apiRemoveWorkLogo", props.id);
    };

    const updateItem = (item) => {
      store.dispatch("work/apiUpdateWorkItem", {
        workId: props.id,
        itemId: item.id,
        payload: {
          language_code: props.language,
          title: item.title.trim() || null,
          employment_type: item.employment_type,
          location: item.location.trim() || null,
          date_from: item.date_from || null,
          date_to: item.date_to || null,
          body_markdown: item.body_markdown.trim() || null,
          skills: item.skills.trim() === "" ? null : splitSkills(item.skills),
        },
      });
    };

    const deleteItem = (itemId) => {
      store.dispatch("work/apiDeleteWorkItem", { workId: props.id, itemId });
    };

    const addItem = () => {
      if (!canAddItem.value) return;
      store.dispatch("work/apiCreateWorkItem", {
        workId: props.id,
        payload: {
          title: { pl: newItem.title_pl.trim(), en: newItem.title_en.trim() },
          employment_type: newItem.employment_type,
          location: toMultiLang(newItem.location_pl, newItem.location_en),
          date_from: newItem.date_from || null,
          date_to: newItem.date_to || null,
          body_markdown: toMultiLang(newItem.body_markdown_pl, newItem.body_markdown_en),
          skills: newItem.skills.trim() === "" ? null : splitSkills(newItem.skills),
        },
      });

      newItem.title_pl = "";
      newItem.title_en = "";
      newItem.employment_type = null;
      newItem.location_pl = "";
      newItem.location_en = "";
      newItem.date_from = "";
      newItem.date_to = "";
      newItem.body_markdown_pl = "";
      newItem.body_markdown_en = "";
      newItem.skills = "";
    };

    return {
      work,
      form,
      itemsForm,
      newItem,
      canAddItem,
      EMPLOYMENT_TYPE_OPTIONS,
      closePanel,
      saveCompany,
      uploadLogo,
      removeLogo,
      updateItem,
      deleteItem,
      addItem,
      resolveFileUrl,
    };
  },
};
</script>

<style lang="scss" scoped>
.edit__company__container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;

  .close__container {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    svg {
      width: 2rem;
      height: 2rem;
      fill: white;
      cursor: pointer;
    }
  }

  .edit__company__box {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      width: 100%;
      font-size: 2rem;
      color: white;
      text-align: center;
    }

    .dates {
      width: 100%;
      display: flex;
      gap: 0.5rem;

      .input__info {
        flex: 1;
      }
    }

    .logo__preview {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        width: 4rem;
        height: 4rem;
        object-fit: contain;
        background: white;
        border-radius: 4px;
      }
    }

    .items__list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: none;

      .item {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 0.5rem;

        .item__actions {
          display: flex;
          gap: 0.5rem;
        }
      }
    }

    .new__item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
@media (min-width: 750px) {
  .edit__company__container {
    .edit__company__box {
      width: 70%;
      h3 {
        text-align: left;
      }
    }
  }
}
</style>
