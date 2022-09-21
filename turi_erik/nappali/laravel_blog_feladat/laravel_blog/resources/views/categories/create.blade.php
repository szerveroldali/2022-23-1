<x-guest-layout>
    <x-slot name="title">
        Új kategória
    </x-slot>
<div class="container mx-auto p-3 overflow-hidden min-h-screen">
    <div class="mb-5">
        <h1 class="font-semibold text-3xl mb-4">Új kategória</h1>
        <p class="mb-2">Ezen az oldalon tudsz új kategóriát létrehozni. A bejegyzéseket úgy tudod hozzárendelni, ha a kategória létrehozása után módosítod a bejegyzést, és ott bejelölöd ezt a kategóriát is.</p>
        <a href="/" class="text-blue-400 hover:text-blue-600 hover:underline"><i class="fas fa-long-arrow-alt-left"></i> Vissza a bejegyzésekhez</a>
    </div>

    <form
        x-data="{ categoryName: '', bgColor: '#ff9910ff', textColor: '#ffffffff'}"
        x-init="() => {
            new Picker({
                color: bgColor,
                popup: 'bottom',
                parent: $refs.bgColorPicker,
                onDone: (color) => bgColor = color.hex
            });
            new Picker({
                color: textColor,
                popup: 'bottom',
                parent: $refs.textColorPicker,
                onDone: (color) => textColor = color.hex
            });
        }"
        method="POST">
        <div class="grid grid-cols-4 gap-6">
            <div class="col-span-4 lg:col-span-2 grid grid-cols-2 gap-3">
                <div class="col-span-2">
                    <label for="name" class="block font-medium text-gray-700">Kategória neve</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300" x-model="categoryName">
                </div>
                <div class="col-span-2 lg:col-span-1">
                    <label class="block text-sm font-medium text-gray-700">Háttér színe</label>
                    <div x-ref="bgColorPicker" id="bg-color-picker" class="mt-1 h-8 w-full border border-black" :style="`background-color: ${bgColor};`"></div>
                    <p x-text="bgColor"></p>
                </div>
                <div class="col-span-2 lg:col-span-1">
                    <label class="block text-sm font-medium text-gray-700">Szöveg színe</label>
                    <div x-ref="textColorPicker" id="text-color-picker" class="mt-1 h-8 w-full border border-black" :style="`background-color: ${textColor};`"></div>
                    <p x-text="textColor"></p>
                </div>
            </div>
            <div class="col-span-4 lg:col-span-2">
                <div x-show="categoryName.length > 0">
                    <label class="block font-medium text-gray-700 mb-1">Előnézet</label>
                    <span x-text="categoryName" :style="`background-color: ${bgColor}; color: ${textColor}`" class="py-0.5 px-1.5 font-semibold"></span>
                </div>
            </div>
        </div>

        <input type="hidden" id="bg-color" name="bg-color" x-model="bgColor" />
        <input type="hidden" id="text-color" name="text-color" x-model="textColor" />

        <button type="submit" class="mt-6 bg-blue-500 hover:bg-blue-600 text-gray-100 font-semibold px-2 py-1 text-xl">Létrehozás</button>
    </form>
</div>
</x-guest-layout>