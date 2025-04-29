import { NextRequest, NextResponse } from "next/server";
import subdomains from "./subdomains.json";

export const config = {
  matcher: ["/((?!api/|_next/|static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = new URL(req.url || "");
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // console.log("subdomain", subdomain);

  // const slugResponse = await SlugMiddleware(subdomain);
  // if (slugResponse) {
  //   console.log("slugResponse");
  //   return slugResponse;
  // }

  // const tenantResponse = await TenantMiddleware(subdomain);
  // if (tenantResponse) {
  //   console.log("tenantResponse");
  //   return tenantResponse;
  // }

  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));

  // return new Response(null, { status: 404 });
}

export const SlugMiddleware = async (subdomain: string) => {
  // NO REALIZAR VALIDACIONES DE AUTENTICACION SI ES EL SUBDOMINIO DE AUTENTICACION
  const allowedDomains = ["localhost:3000", "sandbox-oficina.digital"];
  if (allowedDomains.includes(subdomain)) {
    return null;
  }

  const validSlug = await isValidSubdomain(subdomain);

  if (!validSlug) {
    return showSlug_not_found();
  }

  return null; // Si la validación es exitosa, retornar null
};

const isValidSubdomain = async (subdomain: string) => {
  const subdomainData = subdomains.find((d) => d.subdomain === subdomain);

  if (subdomainData) {
    return true;
  } else {
    return false;
  }
};

export const TenantMiddleware = async (subdomain: string) => {
  if (
    subdomain === "localhost:3000" ||
    subdomain === "sandbox-oficina.digital"
  ) {
    return showNext();
  }
};

const showSlug_not_found = () => {
  return NextResponse.redirect(
    new URL(
      `http://auth.${process.env.NEXT_PUBLIC_APP_DOMAIN}/auth/slug_not_found`
    )
  );
};

const showNext = () => {
  return NextResponse.next();
};
