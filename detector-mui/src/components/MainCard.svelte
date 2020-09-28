<script>
    export let uri;

    import Loading from "./Loading.svelte";
    import Guage from "./Guage.svelte";

    import { tag } from "../stores.js";

    let handle;
    let promise;

    const unsubscribe = tag.subscribe(async (value) => {
        handle = value;
        console.log({ handle, uri });
        promise = getUserDetails();
    });

    async function getUserDetails() {
        const packet = await (await fetch(`${uri}${handle}`)).json();
        if (packet.code) {
            throw new Error(packet.message);
        } else {
            return packet;
        }
    }
</script>

<style>
    .container {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .nameDisplay {
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .rowStyle {
        border-radius: 2px;
        border: 2px solid #000000;
    }

    .row {
        height: 21vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        flex-direction: row;
        padding: 12px;
    }

    .final {
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        border: 2px solid #000000;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .score {
        height: 100%;
        width: 50%;
        margin: 5px;
    }

    .final p:first-child {
        margin-right: auto;
        margin-left: 10px;
    }

    .final p:last-child {
        margin-right: 10px;
    }

    .container div:last-child {
        margin-top: auto;
    }

    #disk_d {
        margin: 10px;
    }
</style>

{#await promise}
    <Loading />
{:then packet}
    <!-- <p>name: {packet.name}</p> -->
    <div class="container">
    <div class="nameDisplay rowStyle">
        <p>Account Name: {packet.name}</p>
    </div>
    <div class="row rowStyle">
        <div class="score rowStyle">
            <Guage 
                val={packet.dicesCoefficient.dcRandomSelection}
                attr="Dice's Coefficient Random Selection"/>
        </div>
        <div class="score rowStyle">
            <Guage 
                val={packet.dicesCoefficient.dcMean}
                attr="Dice's Coefficient Average"/>
        </div>
    </div>
    <div class="row rowStyle">
        <div class="score rowStyle">
            <Guage 
                val={packet.levenshteinDistance.LDRatioRandomSelection}
                attr="Levenshtein Distance RS"/>
        </div>
        <div class="score rowStyle">
            <Guage 
                val={packet.levenshteinDistance.LDRatioMean}
                attr="Levenshtein Distance Average"/>
        </div>
    </div>
    <div class="final rowStyle">
        <p>(Higher is Faker)</p>
        <meter id="disk_d" value="{packet.fakeScore}">{Math.floor(packet.fakeScore * 100)}%</meter>
        <p>{Math.floor(packet.fakeScore * 100)}%</p>
    </div>
</div>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
