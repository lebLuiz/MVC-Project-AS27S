<template>
    <div class="w-full h-full flex flex-col">
        <slot class="flex-1" name="header" />

        <div class="bg-gray-50 w-full h-max flex-1 flex flex-col items-center">
            <div class="w-full h-full p-5 max-w-screen-xl">
                <slot name="content" />
            </div>
        </div>
    </div>
</template>