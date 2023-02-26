<template>
  <div class="modal" v-show="showModal">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__title">Potwierdzenie usunięcia harmonogramu</h2>
        <button class="modal__close-btn modal__close-btn--large" @click="$emit('close')">
          <i class="mdi mdi-close"></i>
        </button>
      </div>
      <div class="modal__body">
        <p>Czy na pewno chcesz usunąć ten harmonogram? Tej operacji nie będzie można cofnąć. W celu potwierdzenia,
          kliknij przycisk "Usuń". Aby anulować, kliknij przycisk "Anuluj".</p>
      </div>
      <div class="modal__footer">
        <button class="modal__btn modal__btn--cancel" @click="$emit('close')">Anuluj</button>
        <button class="modal__btn modal__btn--confirm" @click="$emit('confirm')">Usuń</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteConfirmModal",
  props: {
    showModal: Boolean
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__content {
  width: 80%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal__title {
  font-size: 24px;
  color: #333;
}

.modal__close-btn {
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
}

.modal__close-btn--large {
  font-size: 1.5rem;
  margin-right: 1rem;

}

.modal__close-btn:hover .mdi {
  color: red;
}

.mdi {
  font-size: 24px;
  color: black;
}

.modal__body {
  width: 100%;
  margin-bottom: 20px;
  color: #666;
}

.modal__footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.modal__btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.modal__btn--cancel {
  color: #333;
  background-color: #ddd;
  margin-right: 10px;
}

.modal__btn--cancel:hover {
  background-color: #bbb;
}

.modal__btn--confirm {
  color: #fff;
  background-color: #f00;
}

.modal__btn--confirm:hover {
  background-color: #c00;
}
</style>