<script>
    export let val;
    export let attr;

    import Speedometer from "svelte-speedometer";
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .speedo {
        height: 10vh;
        width: 100%;
    }

    .attr {
        margin-top: 5px;
    }

    @media (min-width: 979px) {
        /* Selectors and styles affecting screens WIDER THAN 979px (Desktop) */
        .speedo {
            height: 16vh;
            width: 25%;
        }
    }
</style>

<div class="container">
    <div class="speedo">
        <Speedometer
            fluidWidth={true}
            maxValue={100}
            value={Math.floor(val * 100)}
            maxSegmentLabels={0} />
    </div>
    <p class="attr">
        <center>{Math.floor(val * 100)}%</center>
    </p>
    <p class="attr">
        <center>{attr}</center>
    </p>
</div>
