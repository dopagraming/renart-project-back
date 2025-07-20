import axios from "axios";

const API_KEY = "goldapi-4dosmdbldwot-io";

export const getGoldPrice = async () => {
    try {
        const res = await axios.get("https://www.goldapi.io/api/XAU/USD", {
            headers: {
                "x-access-token": API_KEY,
                "Content-Type": "application/json",
            },
        });

        const ouncePrice = res.data.price;
        const gramPrice = ouncePrice / 31.1035;
        return +gramPrice.toFixed(2);
    } catch (error) {
        console.error("Gold price error:", error.message);
        return 73.5;
    }
};
