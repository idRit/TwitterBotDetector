<script>
    import { Textfield, Button } from "svelte-mui";
    import { tag } from "../stores";

    let handle = "";

    async function handleBtnClick() {
        if (handle) {
            publishHandle(handle.split("@")[1]);
            handle = "";
        }
        return;
    }

    async function publishHandle(handle) {
        tag.set(handle);
    }

    function handleEnter(event) {
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                handleBtnClick();
                break;

            case 8:
                if (handle.length < 1) handle = "@";
                break;

            default:
                break;
        }
    }

    function handleOnFocus() {
        if (handle.length < 1) handle = "@";
    }

    function handleOnFocusOut() {
        if (handle === "@") handle = "";
    }
</script>

<style>
    .container {
        padding: 10px;
        padding-bottom: 10px;
        width: 100%;
        display: flex;
    }

    .tfContainer {
        padding-right: 10px;
    }

    .btnContainer {
        padding-top: 15px;
        padding-left: 10px;
    }
</style>

<div class="container">
    <div class="tfContainer">
        <Textfield
        label="@username"
        bind:value={handle}
        on:keyup={handleEnter}
        on:focus={handleOnFocus}
        on:focusout={handleOnFocusOut} />
    </div>
    <div class="btnContainer">
        <Button raised on:click={handleBtnClick}>Detect</Button>
    </div>
</div>
