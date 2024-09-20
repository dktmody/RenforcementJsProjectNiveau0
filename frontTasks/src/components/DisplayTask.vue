<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ref } from 'vue';

const router = useRouter();
let tasks = ref([]);

function goToAddTask() {
  console.log(router)
  router.push({ name: 'AddTask' });
}
onMounted(() => {
  fetch('http://localhost:3005/get-task', {
    method: 'GET',
    mode: 'cors'
  })
    .then(response => response.json())
    .then(data => {
      tasks.value = data;
      console.log(tasks)
    })
    .catch(error => console.error('Erreur:', error));
});

</script>

<template>
  <div class="greetings">
    <h1 class="green">La liste des tâches</h1>
    <button @click="goToAddTask">Ajouter une Tâche</button>
    <ul>
      <li v-for="task in tasks " :key="task._id">
        <p>{{ task.name }}</p>
        <p>{{ task.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
