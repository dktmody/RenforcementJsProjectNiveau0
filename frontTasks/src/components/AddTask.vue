<!-- AddTask.vue -->
<template>
    <div class="add-task">
      <h1>Ajouter une nouvelle tâche</h1>
      <form @submit.prevent="submitTask">
        <label for="name">Nom :</label>
        <input v-model="task.name" type="text" id="name" required />
        
        <label for="description">Description :</label>
        <textarea v-model="task.description" id="description" required></textarea>
        
        <button type="submit">Ajouter la tâche</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  let task = ref({
    name: '',
    description: ''
  });
  
  const submitTask = () => {
    fetch('http://localhost:3005/newTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task.value)
    })
    .then(response => response.json())
    .then(data => {
      alert('Tâche ajoutée avec succès !');
      task.value = { name: '', description: '' }; 
    })
    .catch(error => console.error('Erreur:', error));
  };
  </script>
  
  <style scoped>
    .add-task {
      max-width: 600px;
      margin: auto;
    }
  </style>
  