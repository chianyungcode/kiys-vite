import { zodResolver } from "@hookform/resolvers/zod";
import {
  Link,
  createFileRoute,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { fetchProduct } from "@/api/productApi";
import NotFound from "@/components/not-found";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Form } from "@/components/ui/form";
import QuantityCount from "@/components/ui/quantity-count";
import { useAuth } from "@/context/auth-provider";
import { axiosInstance } from "@/lib/axios";
import { Image } from "@/types/image";
import { Product } from "@/types/product";
import { formatToRupiah } from "@/utils/currency-format";
import { capitalizationFirstLetter } from "@/utils/string-format";

const formSchema = z.object({
  isPaid: z.boolean().default(false),
  userId: z.string().uuid(),
  orderItems: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number(),
    })
  ),
});

const ProductDetailsPage = () => {
  const [numberQuantity, setNumberQuantity] = useState(1);
  const { userId, accessToken } = useAuth();
  const navigate = useNavigate();

  const { product } = useLoaderData({ from: "/_layout/products/$productSlug" });
  const { data }: { data: Product } = product;
  const productPrice = formatToRupiah(data.price);

  const params = useParams({ from: "/_layout/products/$productSlug" });
  const { pathname } = useLocation();
  const splittedPathname = pathname.split("/").slice(1, 3);

  const isParamsActive =
    params.productSlug === splittedPathname[1]
      ? "font-bold text-black"
      : "font-base";

  const onChangeQuantity = (value: number) => {
    setNumberQuantity(value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPaid: false,
      userId: userId || undefined,
      orderItems: [
        {
          productId: data.id,
          quantity: numberQuantity,
        },
      ],
    },
  });

  useEffect(() => {
    form.setValue("orderItems.0.quantity", numberQuantity);
  }, [numberQuantity, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted", values); // Tambahkan log untuk memastikan onSubmit dipanggil

    if (!accessToken) {
      navigate({ to: "/login" });
    }

    try {
      const response = await axiosInstance.post("/orders", {
        isPaid: values.isPaid,
        userId: values.userId,
        orderItems: values.orderItems,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/${splittedPathname[0]}`}>
                  {capitalizationFirstLetter(splittedPathname[0])}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={`/${splittedPathname[0]}/${splittedPathname[1]}`}
                  className={isParamsActive}
                >
                  {data.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid grid-cols-2 gap-x-8">
          <div className="space-y-4 py-4">
            <div className="overflow-hidden rounded-3xl">
              <div className="aspect-square">
                <img
                  src={data.images?.[0]?.url || "/images/image.webp"}
                  alt="product-image-1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {data.images &&
                data.images.map((image: Image) => (
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={image.url || "/images/image.webp"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="space-y-20 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-sora font-semibold text-[#323334] ">
                {data.name}
              </h1>
              <p className="text-xs font-medium">{data.sku.toUpperCase()}</p>
            </div>
            <div className="space-y-8">
              <p className="text-5xl font-sora font-semibold text-[#323334]">
                {productPrice}
              </p>
              <p className="text-[#5B5C5D]">{data.description}</p>
              {/* <div className="space-y-4" id="options">
                <h2 className="font-sora font-medium">Switch Type</h2>
                <div className="flex gap-2 flex-wrap">
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                </div>
              </div>
              <div className="space-y-4" id="options">
                <h2 className="font-sora font-medium">Switch Type</h2>
                <div className="flex gap-2 flex-wrap">
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                  <Button className="bg-[#323334]">Linear Switch</Button>
                </div>
              </div> */}
              <div className="border border-gray-200 rounded-2xl flex flex-col gap-y-2 px-6 py-4">
                <div className="flex items-center gap-x-4 w-full">
                  <div className="flex-grow">
                    <QuantityCount
                      inPopoverCart={false}
                      value={numberQuantity}
                      onChange={onChangeQuantity}
                    />
                  </div>
                  <p className="whitespace-nowrap">Stok sisa 8</p>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex gap-x-2"
                  >
                    <Button
                      type="submit"
                      className="bg-[#D92A36] h-16 w-full flex gap-x-2 items-center rounded-xl"
                    >
                      <ShoppingBag />
                      <h2 className="text-lg">Add to cart</h2>
                    </Button>
                    <Button className="h-16 p-6 rounded-xl">
                      <Heart />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const Route = createFileRoute("/_layout/products/$productSlug")({
  loader: async ({ params: { productSlug } }) => {
    const product = await fetchProduct(productSlug);
    return { product };
  },
  component: ProductDetailsPage,
  notFoundComponent: () => {
    return <NotFound>Product not found</NotFound>;
  },
});
