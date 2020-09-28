<script>
    export let val;
    export let attr;

    import Speedometer from "svelte-speedometer";
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        /* align-items: center; */
    }

    .attr {
        margin-top: 5px;
    }
</style>

<div class="container">
    <Speedometer
        fluidWidth={true}
        maxValue={100}
        value={Math.floor(val * 100)}
        maxSegmentLabels={0} />
    <p class="attr">
        <center>{Math.floor(val * 100)}%</center>
    </p>
    <p class="attr">
        <center>{attr}</center>
    </p>
</div>
