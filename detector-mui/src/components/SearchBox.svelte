<script>
    import { Textfield, Button } from "svelte-mui";
    import { tag, btnDisable } from "../stores";

    let handle = "";
    let disabled = false;

    async function handleBtnClick() {
        if (handle) {
            publishHandle(handle.split("@")[1]);
            handle = "";
        }
        return;
    }

    const unsubscribe = btnDisable.subscribe(async (value) => {
        disabled = value;
    });

    async function publishHandle(handle) {
        tag.set(handle);
    }

    function handleEnter(event) {
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                handleBtnClick();
                handleOnFocusOut();
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
        padding-right: 15px;
        margin-right: auto;
    }

    .btnContainer {
        padding-top: 15px;
        padding-left: 5px;
        margin-left: auto;
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
        <Button raised on:click={handleBtnClick} disabled={disabled}>Detect</Button>
    </div>
</div>
