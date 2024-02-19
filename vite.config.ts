import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import viteIntegratedPlugin from 'vite-plugin-integrated'


export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const env = loadEnv(mode, process.cwd(), '')
    return {
        // vite config
        plugins: [react(),
            viteIntegratedPlugin({
                    templatePath: 'index.ejs',
                    name: 'include.js',
                    options: {
                        assetsUrl: env.ASSETS_URL,
                    }
                }
            ),
            viteIntegratedPlugin({
                    templatePath: 'include.ejs',
                    name: 'include.txt',
                    options: {
                        assetsUrl: env.ASSETS_URL,
                    }
                }
            )
        ],
    }
})
