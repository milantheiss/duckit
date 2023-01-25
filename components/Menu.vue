<template>
    <div class="w-full flex justify-center items-center text-lg font-semibold ">
        <NuxtLink to="/register" class="whitespace-nowrap flex justify-between items-center">
            <!--Sparkles Icon-->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" class="w-6 h-6">
                <g filter="url(#a)">
                    <path fill="url(#b)"
                        d="M15.82 11.1c-.17.67-.75 1.16-1.43 1.5a40.58 40.58 0 0 0-4.74 1.95c-1.12.55-1.11 2.3.01 2.85 1.32.64 2.97 1.25 4.8 1.98.5.2 1.2.75 1.37 1.43a55.5 55.5 0 0 0 2.06 6.35c.62 1.58 2.16 1.58 2.78 0 .81-2.06 1.43-4.29 2.13-6.4.16-.65.65-1.17 1.29-1.4a69.6 69.6 0 0 0 4.72-1.88 1.62 1.62 0 0 0 .04-2.95 55.78 55.78 0 0 0-4.77-2 2.16 2.16 0 0 1-1.34-1.4C22 8.8 21.51 6.84 20.71 4.81c-.63-1.59-2.27-1.54-2.89.05-.8 2.02-1.36 4.04-2 6.24Z" />
                </g>
                <path fill="url(#c)"
                    d="M15.82 11.1c-.17.67-.75 1.16-1.43 1.5a40.58 40.58 0 0 0-4.74 1.95c-1.12.55-1.11 2.3.01 2.85 1.32.64 2.97 1.25 4.8 1.98.5.2 1.2.75 1.37 1.43a55.5 55.5 0 0 0 2.06 6.35c.62 1.58 2.16 1.58 2.78 0 .81-2.06 1.43-4.29 2.13-6.4.16-.65.65-1.17 1.29-1.4a69.6 69.6 0 0 0 4.72-1.88 1.62 1.62 0 0 0 .04-2.95 55.78 55.78 0 0 0-4.77-2 2.16 2.16 0 0 1-1.34-1.4C22 8.8 21.51 6.84 20.71 4.81c-.63-1.59-2.27-1.54-2.89.05-.8 2.02-1.36 4.04-2 6.24Z" />
                <g filter="url(#d)">
                    <path fill="url(#e)"
                        d="M7.77 5.82c-.06.2-.24.37-.46.48-.63.21-1.12.42-1.53.62-.36.18-.36.75 0 .92.43.2.96.4 1.55.64.16.06.38.24.44.46.17.67.4 1.38.66 2.04.2.51.7.51.9 0 .26-.66.46-1.38.68-2.06a.65.65 0 0 1 .42-.45c.55-.2 1.08-.41 1.52-.6.4-.18.41-.76.01-.95-.43-.2-.96-.44-1.53-.65a.7.7 0 0 1-.43-.45c-.25-.74-.4-1.37-.66-2.03-.2-.5-.73-.5-.93.02-.26.65-.44 1.3-.64 2Z" />
                </g>
                <path fill="url(#f)"
                    d="M7.77 5.82c-.06.2-.24.37-.46.48-.63.21-1.12.42-1.53.62-.36.18-.36.75 0 .92.43.2.96.4 1.55.64.16.06.38.24.44.46.17.67.4 1.38.66 2.04.2.51.7.51.9 0 .26-.66.46-1.38.68-2.06a.65.65 0 0 1 .42-.45c.55-.2 1.08-.41 1.52-.6.4-.18.41-.76.01-.95-.43-.2-.96-.44-1.53-.65a.7.7 0 0 1-.43-.45c-.25-.74-.4-1.37-.66-2.03-.2-.5-.73-.5-.93.02-.26.65-.44 1.3-.64 2Z" />
                <g filter="url(#g)">
                    <path fill="url(#h)"
                        d="M5.23 20.07c-.08.3-.34.51-.65.67-.87.3-1.55.59-2.12.87-.5.25-.5 1.04 0 1.28.6.29 1.33.56 2.16.89.22.09.53.33.6.64.25.94.58 1.93.93 2.85.28.71.97.71 1.25 0 .37-.92.64-1.92.96-2.87a.9.9 0 0 1 .58-.63c.77-.27 1.51-.58 2.12-.85a.73.73 0 0 0 .01-1.32c-.6-.28-1.33-.6-2.14-.9a.97.97 0 0 1-.6-.63c-.34-1.03-.55-1.91-.91-2.83-.28-.7-1.02-.69-1.3.03-.36.9-.6 1.81-.9 2.8Z" />
                </g>
                <defs>
                    <linearGradient id="b" x1="26.13" x2="15.05" y1="11.27" y2="22.93" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFCF5A" />
                        <stop offset="1" stop-color="#FEA254" />
                    </linearGradient>
                    <linearGradient id="c" x1="14.75" x2="20.79" y1="29.29" y2="16.55" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF886D" />
                        <stop offset="1" stop-color="#FF886D" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="e" x1="11.09" x2="7.52" y1="5.87" y2="9.62" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFDA72" />
                        <stop offset="1" stop-color="#F7A967" />
                    </linearGradient>
                    <linearGradient id="f" x1="8.89" x2="8.89" y1="11.98" y2="7.86" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FDA071" />
                        <stop offset="1" stop-color="#FDA071" stop-opacity="0" />
                    </linearGradient>
                    <filter id="a" width="21.61" height="25.19" x="8.41" y="3.4" color-interpolation-filters="sRGB"
                        filterUnits="userSpaceOnUse">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx=".25" dy="-.25" />
                        <feGaussianBlur stdDeviation=".25" />
                        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                        <feColorMatrix values="0 0 0 0 0.937255 0 0 0 0 0.482353 0 0 0 0 0.329412 0 0 0 1 0" />
                        <feBlend in2="shape" result="effect1_innerShadow_18_454" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx=".25" dy=".25" />
                        <feGaussianBlur stdDeviation=".5" />
                        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                        <feColorMatrix values="0 0 0 0 0.737255 0 0 0 0 0.615686 0 0 0 0 0.415686 0 0 0 1 0" />
                        <feBlend in2="effect1_innerShadow_18_454" result="effect2_innerShadow_18_454" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx="-.4" dy=".25" />
                        <feGaussianBlur stdDeviation=".2" />
                        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.901961 0 0 0 0 0.458824 0 0 0 1 0" />
                        <feBlend in2="effect2_innerShadow_18_454" result="effect3_innerShadow_18_454" />
                    </filter>
                    <filter id="d" width="6.95" height="8.05" x="5.41" y="3.42" color-interpolation-filters="sRGB"
                        filterUnits="userSpaceOnUse">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx=".1" dy=".1" />
                        <feGaussianBlur stdDeviation=".1" />
                        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                        <feColorMatrix values="0 0 0 0 0.803922 0 0 0 0 0.6 0 0 0 0 0.262745 0 0 0 1 0" />
                        <feBlend in2="shape" result="effect1_innerShadow_18_454" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx="-.1" dy=".1" />
                        <feGaussianBlur stdDeviation=".1" />
                        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.882353 0 0 0 0 0.423529 0 0 0 1 0" />
                        <feBlend in2="effect1_innerShadow_18_454" result="effect2_innerShadow_18_454" />
                    </filter>
                    <filter id="g" width="9.56" height="11.23" x="2.08" y="16.57" color-interpolation-filters="sRGB"
                        filterUnits="userSpaceOnUse">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dx=".15" dy="-.15" />
                        <feGaussianBlur stdDeviation=".15" />
                        <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                        <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.458824 0 0 0 0 0.462745 0 0 0 1 0" />
                        <feBlend in2="shape" result="effect1_innerShadow_18_454" />
                    </filter>
                    <radialGradient id="h" cx="0" cy="0" r="1"
                        gradientTransform="matrix(-4.2802 5.63466 -5.4871 -4.1681 10.01 18.57)"
                        gradientUnits="userSpaceOnUse">
                        <stop offset=".36" stop-color="#FFBC64" />
                        <stop offset="1" stop-color="#FF8F6B" />
                    </radialGradient>
                </defs>
            </svg><span class="hover:underline ml-2">Tickets erstellen</span>
        </NuxtLink>
        <p class="mx-2">|</p>
        <NuxtLink to="/checkin" class="whitespace-nowrap flex justify-between items-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6">
                <g filter="url(#filter0_iii_18_1325)">
                    <path
                        d="M29.305 19.4C28.675 19.4 28.165 18.89 28.165 18.26C28.165 17.63 28.675 17.12 29.305 17.12H29.525C29.785 17.12 30.005 16.91 30.005 16.64V15.37C30.005 15.11 29.795 14.89 29.525 14.89H29.345C28.715 14.89 28.175 14.4 28.165 13.77C28.155 13.13 28.665 12.61 29.305 12.61H29.525C29.785 12.61 30.005 12.4 30.005 12.13V10.57C30.005 10.33 29.825 10.13 29.585 10.1C28.155 9.91001 27.015 8.79 26.795 7.37C26.755 7.1 26.515 6.89001 26.235 6.89001H5.745C5.465 6.89001 5.225 7.09 5.185 7.37C4.965 8.78 3.835 9.89 2.415 10.09C2.175 10.12 1.995 10.32 1.995 10.56V12.13C1.995 12.39 2.20499 12.61 2.47499 12.61H2.65499C3.28499 12.61 3.825 13.1 3.835 13.73C3.845 14.37 3.335 14.89 2.695 14.89H2.47499C2.21499 14.89 1.995 15.1 1.995 15.37V16.64C1.995 16.9 2.20499 17.12 2.47499 17.12H2.695C3.325 17.12 3.835 17.63 3.835 18.26C3.835 18.89 3.325 19.4 2.695 19.4H2.47499C2.21499 19.4 1.995 19.61 1.995 19.88V21.46C1.995 21.7 2.175 21.9 2.415 21.93C3.835 22.12 4.965 23.23 5.185 24.64C5.225 24.91 5.465 25.11 5.745 25.11H26.255C26.535 25.11 26.775 24.91 26.815 24.64C27.035 23.23 28.165 22.12 29.575 21.93C29.815 21.9 29.995 21.7 29.995 21.46V19.88C29.995 19.62 29.785 19.4 29.515 19.4H29.305Z"
                        fill="url(#paint0_linear_18_1325)" />
                </g>
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.25989 11.98C6.25989 10.7235 7.27658 9.69495 8.54494 9.69495H23.4549C24.7233 9.69495 25.74 10.7235 25.74 11.98V20C25.74 21.2565 24.7233 22.285 23.4549 22.285H20.45C20.4175 22.2979 20.382 22.305 20.3449 22.305C20.3078 22.305 20.2724 22.2979 20.2399 22.285H11.76C11.7275 22.2979 11.692 22.305 11.6549 22.305C11.6178 22.305 11.5824 22.2979 11.5499 22.285H8.54494C7.28844 22.285 6.25989 21.2683 6.25989 20V11.98ZM20.63 21.7149H23.4549C24.4066 21.7149 25.1699 20.9435 25.1699 20V11.98C25.1699 11.0365 24.4066 10.265 23.4549 10.265H20.63V21.7149ZM20.0599 10.265V21.7149H11.94V10.265H20.0599ZM8.54494 10.265H11.3699V21.7149H8.54494C7.60144 21.7149 6.82999 20.9516 6.82999 20V11.98C6.82999 11.0365 7.59329 10.265 8.54494 10.265Z"
                    fill="url(#paint1_linear_18_1325)" />
                <path
                    d="M9.08503 12.17C8.57503 12.17 8.15503 12.59 8.15503 13.1V18.74C8.15503 19.25 8.57503 19.67 9.08503 19.67C9.59503 19.67 10.015 19.25 10.015 18.74V13.1C10.015 12.58 9.59503 12.17 9.08503 12.17Z"
                    fill="#C43B66" />
                <path
                    d="M23.0249 12.17C22.5149 12.17 22.0949 12.59 22.0949 13.1V18.74C22.0949 19.25 22.5149 19.67 23.0249 19.67C23.5349 19.67 23.9549 19.25 23.9549 18.74V13.1C23.9549 12.58 23.5349 12.17 23.0249 12.17Z"
                    fill="#C53C66" />
                <path
                    d="M15.9951 18.29C17.061 18.29 17.9251 17.4259 17.9251 16.36C17.9251 15.2941 17.061 14.43 15.9951 14.43C14.9292 14.43 14.0651 15.2941 14.0651 16.36C14.0651 17.4259 14.9292 18.29 15.9951 18.29Z"
                    fill="#C43B66" />
                <defs>
                    <filter id="filter0_iii_18_1325" x="1.495" y="6.39001" width="29.01" height="18.72"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="-0.5" />
                        <feGaussianBlur stdDeviation="0.25" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.55 0 0 0 0 0.769156 0 0 0 1 0" />
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_18_1325" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dx="0.5" />
                        <feGaussianBlur stdDeviation="0.25" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.909804 0 0 0 0 0.403922 0 0 0 0 0.427451 0 0 0 1 0" />
                        <feBlend mode="normal" in2="effect1_innerShadow_18_1325" result="effect2_innerShadow_18_1325" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha" />
                        <feOffset dy="-0.5" />
                        <feGaussianBlur stdDeviation="0.5" />
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                        <feColorMatrix type="matrix"
                            values="0 0 0 0 0.811765 0 0 0 0 0.164706 0 0 0 0 0.439216 0 0 0 1 0" />
                        <feBlend mode="normal" in2="effect2_innerShadow_18_1325" result="effect3_innerShadow_18_1325" />
                    </filter>
                    <linearGradient id="paint0_linear_18_1325" x1="1.995" y1="17.375" x2="30.005" y2="17.375"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ED3558" />
                        <stop offset="1" stop-color="#FF51A8" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_18_1325" x1="8.61993" y1="15.3125" x2="24.3074" y2="15.3125"
                        gradientUnits="userSpaceOnUse">
                        <stop stop-color="#C43B66" />
                        <stop offset="1" stop-color="#C63C66" />
                    </linearGradient>
                </defs>
            </svg>

            <span class="hover:underline ml-2">Kontrollieren</span>
        </NuxtLink>
    </div>
</template>