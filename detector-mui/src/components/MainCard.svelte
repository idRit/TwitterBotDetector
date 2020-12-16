<script>
    export let uri;

    import Loading from "./Loading.svelte";
    import Guage from "./Guage.svelte";
    import BodyCard from "./BodyCard.svelte";

    import { tag, btnDisable } from "../stores.js";

    let handle;
    let promise;

    const unsubscribe = tag.subscribe(async (value) => {
        handle = value;
        console.log({ handle, uri });
        promise = getUserDetails();
    });

    async function getUserDetails() {
        btnDisable.set(true);
        const packet = await (await fetch(`${uri}${handle}`)).json();
        // const packet = {
        //     name: "here's your reminder",
        //     desc:
        //         "please take a break! for a personal reminder, please tweet me! (bot-in-progress by @jonnysun) (current av: apples, james marion shull, 1912, c/o @pomological)",
        //     dicesCoefficient: {
        //         dcRandomSelection: 0.16666666666666666,
        //         dcMean: 0.21082017915523107,
        //     },
        //     levenshteinDistance: {
        //         LDRatioRandomSelection: 0.3280224929709466,
        //         LDRatioMean: 0.3420057354434891,
        //     },
        //     fakeScore: 0.30019434669221845,
        // };
        console.log(packet);
        btnDisable.set(false);
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
        height: 14vh;
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

    @media (min-width: 979px) {
        /* Selectors and styles affecting screens WIDER THAN 979px (Desktop) */
        .row {
            height: 27vh;
        }
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
        <BodyCard 
            str={JSON.stringify(packet)}/>
        <!-- <div class="row rowStyle">
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
    </div> -->
        <div class="final rowStyle">
            <p>(Higher is Faker)</p>
            <meter
                id="disk_d"
                value={packet.fakeScore}>{Math.floor(packet.fakeScore * 100)}%</meter>
            <p>{Math.floor(packet.fakeScore * 100)}%</p>
        </div>
    </div>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
