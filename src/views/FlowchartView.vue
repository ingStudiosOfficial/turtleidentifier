<script setup>
    import { ref, onMounted } from 'vue';
    import { VueFlow, useVueFlow } from '@vue-flow/core'
    import turtlesDataset from '../data/turtles.json' with { type: 'json' };

    const nodes = ref([]);
    const edges = ref([]);

    // Calculate levels first
    const calculateLevels = () => {
        const levels = {};
        const queue = [{ id: 'question1', level: 0 }];
        const visited = new Set();
        
        while (queue.length > 0) {
            const { id, level } = queue.shift();
            if (visited.has(id)) continue;
            
            visited.add(id);
            levels[id] = level;
            
            const node = turtlesDataset.key[id];
            if (node?.options) {
                node.options.forEach(option => {
                    queue.push({ id: option.next_id, level: level + 1 });
                });
            }
        }
        
        // Add organisms to levels
        Object.keys(turtlesDataset.organisms).forEach(orgId => {
            if (!levels[orgId]) {
                levels[orgId] = Math.max(...Object.values(levels)) + 1;
            }
        });
        
        return levels;
    };

    const levels = calculateLevels();
    
    // Group by level
    const nodesByLevel = {};
    Object.entries(levels).forEach(([nodeId, level]) => {
        if (!nodesByLevel[level]) nodesByLevel[level] = [];
        nodesByLevel[level].push(nodeId);
    });

    Object.entries(nodesByLevel).forEach(([level, nodeIds]) => {
        const y = parseInt(level) * 200;  // Vertical spacing
        const spacing = 350;  // Horizontal spacing
        
        nodeIds.forEach((nodeId, index) => {
            const x = index * spacing;
            
            if (turtlesDataset.key[nodeId]) {
                nodes.value.push({
                    id: nodeId,
                    position: { x, y },
                    data: { label: turtlesDataset.key[nodeId].question }
                });
            } else if (turtlesDataset.organisms[nodeId]) {
                nodes.value.push({
                    id: nodeId,
                    position: { x, y },
                    data: { label: turtlesDataset.organisms[nodeId].name },
                    type: 'output'
                });
            }
        });
    });

    // Create edges with straight 90-degree lines
    Object.entries(turtlesDataset.key).forEach(([questionId, questionData]) => {
        questionData.options.forEach((option, index) => {
            edges.value.push({
                id: `${questionId}-${option.next_id}-${index}`,
                source: questionId,
                target: option.next_id,
                label: option.choice,
                type: 'smoothstep',
                animated: false
            });
        });
    });

    const { fitView } = useVueFlow();

    onMounted(() => {
        setTimeout(() => {
            fitView({ 
                padding: 0.2,
                includeHiddenNodes: false,
                minZoom: 0.5,
                maxZoom: 1.5
            });
        }, 100);
    });
</script>

<template>
    <div style="height: 100vh; width: 100vw;">
        <VueFlow 
            :nodes="nodes" 
            :edges="edges"
            :default-viewport="{ x: 0, y: 0, zoom: 1 }"
        >
        </VueFlow>
    </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

/* Optional: Make container full screen */
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}
</style>