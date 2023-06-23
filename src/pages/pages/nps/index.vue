<template>
  <div class="table-container">
    <v-table>
      <thead>
        <tr>
          <th class="columna">ID</th>
          <th class="columna-seccion">Nombre Usuario</th>
          <th class="columna-seccion">Email</th>
          <th class="columna-seccion">Puntaje NPS</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td colspan="4">Cargando usuarios...</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.npsScore }}</td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const users = ref([]);
    const isLoading = ref(false);
    const user = ref(null);
    const nombre = ref('');
    const apellido = ref('');
    const email = ref('');
    const rol = ref('');

    //funcion get para listar los usuarios en la tabla
    onMounted(async () => {
      isLoading.value = true;
      try {
        const response = await axios.get('https://smarttechnicalcl.000webhostapp.com/api/user');
        users.value = response.data.data;
      } catch (error) {
        console.error(error);
      }
      isLoading.value = false;
    });
    return {
      nombre,
      apellido,
      email,
      rol,
      user,
      users,
      isLoading,
    };
  },
}
</script>

<style scoped>
.rating {
  display: flex;
  justify-content: center;
  margin-block-start: 20px;
}

.buttonps {
  transform: translateX(890%);
}

.buttonps:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  margin-block: 0;
  margin-inline: 5px;
  padding-block: 10px;
  padding-inline: 15px;
  transition: background-color 0.3s ease;
}

button.active {
  background-color: #007bff;
  color: #fff;
}

.table-container {
  display: flex;
  justify-content: center;
  inline-size: 100%;
}

.columna {
  inline-size: 40%;
}

.columna-seccion {
  inline-size: 700px;
}

/* Ajusta los estilos de la tabla según sea necesario */
v-table {
  inline-size: 100%;

  /* Agrega otros estilos personalizados aquí */
}
</style>

