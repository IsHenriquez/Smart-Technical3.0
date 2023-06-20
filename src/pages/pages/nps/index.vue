<template>
  <VLayout>
    <div id="app">
      <button>Abrir</button>

      <div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Agregar elemento</h2>
          <form>
            <input
              type="text"
              placeholder="Ingrese un elemento"
            >
            <button type="submit">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>

    <VMain />
  </VLayout>
</template>


<style>
.modal {
  position: fixed;
  z-index: 1;
  display: none;
  overflow: auto;
  background-color: rgba(0, 0, 0, 40%);
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.modal-content {
  padding: 20px;
  border: 1px solid #888;
  background-color: #fefefe;
  inline-size: 80%;
  margin-block: 15%;
  margin-inline: auto;
}

.close {
  color: #aaa;
  cursor: pointer;
  float: inline-end;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  cursor: pointer;
  text-decoration: none;
}
</style>
