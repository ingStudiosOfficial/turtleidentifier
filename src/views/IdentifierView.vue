<script setup>
    // Vue components
    import { ref, nextTick, onMounted } from 'vue';
    
    // Material Web components
    import '@material/web/button/filled-button.js';
    import '@material/web/button/filled-tonal-button.js';
    import '@material/web/button/outlined-button.js';
    import '@material/web/icon/icon.js';
    
    // Import the dataset
    import turtlesDataset from '../data/turtles.json' with { type: 'json' };

    const currentMode = ref(0);
    const showNextAnimation = ref(false);
    const turtles = ref(turtlesDataset);
    const currentQuestion = ref('question1');
    const turtleFound = ref(null);
    const showQuestionContent = ref(true);
    const showModeContent = ref(true); 

    function transitionMode(newMode) {
        // 1. Start the fade-out
        showModeContent.value = false;

        // 2. Wait for the fade-out duration (600ms)
        setTimeout(() => {
            // 3. Change the mode (which changes the component rendered by v-else-if)
            currentMode.value = newMode;
            
            // 4. Wait for the DOM to update with the new content
            nextTick(() => {
                // 5. Start the fade-in of the new content
                showModeContent.value = true;
            });
        }, 600);
    }

    function beginIdentification() {
        transitionMode(1); 

        setTimeout(() => {
            showNextAnimation.value = true;
            setTimeout(() => {
                transitionMode(2); 
            }, 600);
        }, 3000);
    }

    function goToNextQuestion(question_id) {
        // If it's a turtle ID (not a question), set the result and stop.
        if (!question_id.includes('question')) {
            turtleFound.value = turtlesDataset.organisms[question_id];
            
            // Start fade out of the question content, then the final result will appear
            showQuestionContent.value = false;
        } else {
            // 1. Immediately start the fade-out by hiding the current question
            showQuestionContent.value = false; 
            
            // 2. Wait for the fade-out duration (0.5s from your CSS)
            setTimeout(() => {
                // 3. Update the question ID after fade-out
                currentQuestion.value = question_id;
                
                // 4. Wait for the DOM to update with the new question ID
                nextTick(() => {
                    // 5. Show the new content, which will re-trigger the fade-in animations
                    showQuestionContent.value = true;
                });
            }, 600);
        }
    }

    function identifyAgain() {
        window.location.reload();
    }
</script>

<template>
    <div class="content-wrapper">
        <div v-if="currentMode === 0">
            <div :class="{ 'hide-element-top': !showModeContent }" class="welcome-div">
                <h1 class="main-header">Let's Identify Your Turtle</h1>
                <md-filled-button class="begin-button" @click="beginIdentification()">Begin</md-filled-button>
            </div>
        </div>

        <div class="transition1-div" v-else-if="currentMode === 1">
            <p 
                class="instructions-text" 
                :class="{ 'hide-element-top': showNextAnimation || !showModeContent }"
            >
                Please answer these set of questions and we will be able to identify your turtle.
            </p>
        </div>

        <div v-else-if="currentMode == 2">
            <div :class="{ 'hide-element-top': !showModeContent }" class="questions-container">
                <div v-if="showQuestionContent" :key="currentQuestion" class="questions-div">
                    <h1 class="turtle-question-header">{{ turtles.key[currentQuestion].question }}</h1>
                    <div v-for="(option, index) in turtles.key[currentQuestion].options" :key="index">
                        <md-filled-tonal-button class="question-option" @click="goToNextQuestion(option.next_id)">
                            {{ option.choice }}
                        </md-filled-tonal-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="turtle-found-div" v-if="turtleFound !== null">
            <h1 class="turtle-found-header">Turtle Found!</h1>
            <div class="turtle-species-div" id="turtle-species-div">
                <h1 class="turtle-found-name">{{ turtleFound.name }}</h1>
                <img :src="turtleFound.image_url" class="turtle-image" />
                <p style="font-size: 10px;">Image from Wikimedia Commons</p>
                <p>{{ turtleFound.description }}</p>
                <md-outlined-button @click="identifyAgain()">
                    Identify another
                </md-outlined-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .welcome-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .transition1-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .questions-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .instructions-text {
        font-size: 2em;
        opacity: 0;
        animation-name: fadeInFromBottom;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
    }

    .main-header {
        font-size: 4em;
        opacity: 0;
        animation-name: fadeInFromBottom;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
    }

    .begin-button {
        opacity: 0;
        animation-name: fadeInFromTop;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.75s;
        animation-fill-mode: forwards;
    }

    .hide-element-top {
        opacity: 1;
        animation-name: fadeOutFromTop;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
    }

    .hide-element-bottom {
        opacity: 1;
        animation-name: fadeOutFromBottom;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
    }

    .turtle-question-header {
        font-size: 2em;
        opacity: 0;
        animation-name: fadeInFromTop;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
    }

    .question-option {
        opacity: 0;
        animation-name: fadeInFromBottom;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.75s;
        animation-fill-mode: forwards;
        margin: 10px 0;
    }

    .turtle-found-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
    }

    .turtle-found-header {
        opacity: 0;
        font-size: 4em;
        animation-name: fadeInFromTop;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
    }

    .turtle-species-div {
        opacity: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 25px;
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        max-width: 90%;
        width: 400px;
        box-sizing: border-box;
        animation-name: fadeInFromBottom;
        animation-duration: 0.5s;
        animation-timing-function: ease-out;
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
        gap: 10px;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.5);
    }

    .turtle-image {
        border-radius: 25px;
        width: 100%;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeInFromTop {
        from {
            opacity: 0;
            transform: translateY(-25px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInFromBottom {
        from {
            opacity: 0;
            transform: translateY(25px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes fadeOutFromTop {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-25px);
        }
    }

    @keyframes fadeOutFromBottom {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(25px);
        }
    }
</style>