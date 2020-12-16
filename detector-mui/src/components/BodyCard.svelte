<script>
    export let str;

    import Bar from "svelte-chartjs/src/Bar.svelte";

    let packet = JSON.parse(str);
    let labels = [
        "dcRandomSelection",
        "dcMean",
        "LDRatioRandomSelection",
        "LDRatioMean",
    ];

    let data = {};

    console.log(packet);

    data.labels = labels;

    data.datasets = [];

    data.datasets[0] = {
        label: "Scores",
        data: [
            packet.dicesCoefficient.dcRandomSelection,
            packet.dicesCoefficient.dcMean,
            packet.levenshteinDistance.LDRatioRandomSelection,
            packet.levenshteinDistance.LDRatioMean,
        ],
        backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(98,  182, 239,0.4)",
            
        ],
        borderWidth: 2,
        borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(98,  182, 239, 1)",
        ],
    };

    let options = {
        responsive: true,
        scales: {
            xAxes: [
                {
                    barPercentage: 1,
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)",
                    },
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        maintainAspectRatio: false,
    };
</script>

<style>
    .container {
        padding: 10px;
        overflow-y: auto;
    }
</style>

<div class="container">
    <!-- hi! -->
    <Bar {data} {options} height={450}/>
</div>
