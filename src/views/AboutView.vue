<script setup>
    // Vue components
    import { ref, nextTick, onMounted } from 'vue';
    
    // Material Web components
    import '@material/web/button/outlined-button.js';
    import '@material/web/divider/divider.js';
    
    // Import the dataset
    import turtlesDataset from '../data/turtles.json' with { type: 'json' };

    const downloadJSON = () => {
        // Convert JSON to string
        const jsonString = JSON.stringify(turtlesDataset, null, 2);
        
        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'turtle-identification-key.json';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
</script>

<template>
    <div class="content-wrapper">
        <h1 class="page-header">About</h1>
        <p class="page-paragraph">Hey! Thanks for checking out our turtle identifier!</p>
        <p class="page-paragraph">If you enjoyed this project, please leave a star on our <a href="https://github.com/ingStudiosOfficial/turtleidentifier">GitHub repository</a>.</p>
        <p class="page-paragraph">You can download the turtle dataset by clicking the button below.</p>
        <md-outlined-button @click="downloadJSON()">Download dataset</md-outlined-button>
        <md-divider class="divider"></md-divider>
        <p class="page-paragraph-sm">This project was made possible by Ethan Lee, Ethan Lim, Erik Ung, and Arie van Der Ros.</p>
        <p class="page-paragraph-sm">©2025 (ing) Studios Web Labs</p>
    </div>
</template>

<style scoped>
    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        text-align: center;
    }

    .page-header {
        font-size: 4em;
    }

    .page-paragraph {
        font-size: 2em;
    }

    .page-paragraph-sm {
        font-size: 1em;
    }

    .divider {
        margin: 20px 0;
    }
</style>