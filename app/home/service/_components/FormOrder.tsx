"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { formatToIDR } from "@/lib/formatter";

type ServiceOption = {
    value: string;
    label: string;
};

type CategoryOption = {
    value: string;
    label: string;
    network: string; // Relasi dengan network untuk filtering
};


type NetworkOption = {
    value: string;
    label: string;
};

type NameOption = {
    value: string;
    label: string;
    rate: number;
    category: string;
    description?: string;
    min: number; // Minimal order
};

type FormValues = {
    service: ServiceOption | null;
    link: string;
    jumlah: number;
    dripFeed: boolean;
};



export interface Service {
    service: number; // ID layanan
    name: string; // Nama layanan
    type: string; // Tipe layanan, contoh: "Default"
    category: string; // Kategori layanan, contoh: "Tiktok Followers"
    network: string; // Jaringan sosial, contoh: "Tiktok"
    description: string; // Deskripsi detail layanan
    rate: number; // Harga layanan
    min: number; // Minimum jumlah order
    max: number; // Maksimum jumlah order
    refill: boolean; // Apakah layanan dapat di-refill
    canceling_is_available: boolean; // Apakah pembatalan tersedia
    cancel: boolean; // Status pembatalan
}

export default function FormOrder() {
    const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            service: null,
            link: "",
            jumlah: 50,
            dripFeed: false,
        },
    });

    const [allData, setAllData] = useState<Service[]>([])
    const [services, setServices] = useState<ServiceOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption | null>(null);
    const [filteredCategories, setFilteredCategories] = useState<CategoryOption[]>([]);
    const [filteredNames, setFilteredNames] = useState<NameOption[]>([]);
    const [names, setNames] = useState<NameOption[]>([]);
    const [selectedName, setSelectedName] = useState<NameOption | null>(null);
    const [jumlah, setJumlah] = useState<number>(50); // Default jumlah
    const [harga, setHarga] = useState<number>(0);
    const [minimalOrder, setMinimalOrder] = useState<number>(0); // Minimal order

    const networkIcons: { [key: string]: string } = {
        Tiktok: "https://socpanel.com/storage/networks/tiktok.svg", // Replace with actual icon URLs
        Instagram: "https://socpanel.com/storage/networks/instagram.svg",
        Youtube: "https://socpanel.com/storage/networks/youtube.svg",
        Facebook: "https://socpanel.com/storage/networks/facebook.svg",
    };
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(
                    "https://idcsosmed.com/api/v2?action=services&key=rBlr2RyT3reUglZrs46cqATOZRfODs2WgjgBp3zhW51puIqyolOw6ghHlXCK"
                );
                const uniqueServices = Array.from(
                    new Map(
                        response.data.map((service: any) => [service.network, service])
                    ).values()
                );

                const uniqueCategories = Array.from(
                    new Map(
                        response.data.map((service: any) => [service.category, service])
                    ).values()
                );

                const allCategories = uniqueCategories.map((service: any) => ({
                    value: service.category, // Assuming 'service' is category ID
                    label: service.category,   // Assuming 'name' is category name
                    network: service.network, // Attach the network for filtering
                }));

                const options = uniqueServices.map((service: any) => ({
                    value: service.network,
                    label: service.network,
                    icon: networkIcons[service.network] || "", // Assign icon based on the network
                }));

                const allNames = response.data.map((service: any) => ({
                    value: service.name,
                    label: `${service.name} - ${formatToIDR(service.rate || 0)}`,
                    rate: service.rate,
                    category: service.category,
                    min: service.min, // Minimal order
                }));
                setServices(options);
                setCategories(allCategories)
                setNames(allNames);
                setHarga(0);
                setMinimalOrder(0);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const onSubmit = (data: FormValues) => {
        console.log(data);
        alert(JSON.stringify(data, null, 2));
    };

    const CustomOption = (props: any) => {
        const { data, innerRef, innerProps } = props;
        return (
            <div
                ref={innerRef}
                {...innerProps}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
                {data.icon && <img src={data.icon} alt="" className="w-5 h-5 mr-2" />}
                {data.label}
            </div>
        );
    };

    const handleJumlahChange = (value: number) => {
        if (value >= minimalOrder) {
            setJumlah(value);
            if (selectedName) {
                const calculatedHarga = (selectedName.rate / 1000) * value;
                setHarga(calculatedHarga);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 text-black">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
            >
                <h1 className="text-lg font-bold">Pilih layanan</h1>

                {/* Service */}
                <div>
                    <label className="block mb-2 font-medium">Pilih Layanan</label>
                    {loading ? (
                        <p>Loading services...</p>
                    ) : (
                        <Select
                            options={services}
                            onChange={(selected) => {
                                setSelectedNetwork(selected);
                                if (selected) {
                                    // Filter categories that belong to the selected network
                                    const filtered = categories.filter(
                                        (category) => category.network === selected.value
                                    );
                                    setFilteredCategories(filtered);
                                } else {
                                    setFilteredCategories([]);
                                }

                                // Reset selected category when network changes
                                setSelectedCategory(null);
                            }}
                            className="w-full"
                            placeholder="Pilih layanan"
                            components={{ Option: CustomOption }}
                        />
                    )}
                </div>

                <div>
                    <label className="block mb-2 font-medium text-gray-700">Pilih Kategori</label>
                    <Select
                        options={filteredCategories}
                        value={selectedCategory}
                        onChange={selected => {
                            setSelectedCategory(selected);
                            if (selected) {
                                // Filter names that belong to the selected category
                                const filtered = names.filter((name) => name.category === selected.value);
                                setFilteredNames(filtered);
                                setSelectedName(null);
                                setHarga(0);
                                setMinimalOrder(0);
                            } else {
                                setFilteredNames([]);
                            }

                            // Reset selected name when category changes
                            setSelectedName(null);
                        }}
                        placeholder={
                            selectedNetwork
                                ? "Pilih Kategori"
                                : "Pilih Network terlebih dahulu"
                        }
                        isDisabled={!selectedNetwork} // Disable if no network is selected
                        className="w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium text-gray-700">Pilih Layanan</label>
                    <Select
                        options={filteredNames}
                        value={selectedName}
                        onChange={selected => {
                            setSelectedName(selected)
                            if (selected) {
                                setMinimalOrder(selected.min);
                                setJumlah(selected.min); // Set jumlah to minimal order by default
                                const defaultHarga = (selected.rate / 1000) * selected.min;
                                setHarga(defaultHarga);
                            } else {
                                setMinimalOrder(0);
                                setHarga(0);
                            }
                        }}
                        placeholder={selectedCategory ? "Pilih Layanan" : "Pilih category terlebih dahulu"}
                        isDisabled={!selectedCategory} // Disable if no category is selected
                        className="w-full"
                    />
                </div>

                {/* Link */}
                <div>
                    <label className="block mb-2 font-medium">Link</label>
                    <input
                        type="text"
                        {...register("link", { required: true })}
                        placeholder="Masukkan link"
                        className="w-full border rounded-md p-2"
                    />
                </div>

                {/* Drip Feed */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        {...register("dripFeed")}
                        className="mr-2"
                    />
                    <label className="font-medium">Drip feed</label>
                </div>

                {/* Jumlah & Harga */}
                {selectedName && (
                    <div className="mt-4">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Jumlah (Minimal: {minimalOrder})
                            </label>
                            <input
                                type="number"
                                value={jumlah}
                                onChange={(e) => handleJumlahChange(Number(e.target.value))}
                                min={minimalOrder}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                        <p className="text-gray-700 mt-2">
                            <strong>Harga:</strong> <div>{formatToIDR(harga || 0)}</div>
                        </p>
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md"
                >
                    Buat pesanan
                </button>
            </form>
            {
                    selectedName?.description &&
                    <div> 
                    <h2 className="font-bold mb-2">📌 DETAILS</h2>
                    <p className="text-sm whitespace-pre-line text-gray-700">{selectedName?.description || ""}</p>
                </div>
            }
        </div>
    );
}