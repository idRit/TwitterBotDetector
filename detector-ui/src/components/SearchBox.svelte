<script>
    import Icon from "fa-svelte";
    import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch.js";

    let icon = faSearch;

    import Textfield from "@smui/textfield";

    let name = "";
</script>

<Textfield bind:value={name} label="Name" />