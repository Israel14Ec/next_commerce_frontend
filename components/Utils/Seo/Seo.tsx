import Head from "next/head" //Cabacera

type SeoProps = {
    title?: string
    description?: string
}


//El Head se utiliza en client components

export function Seo({
    title = "Gaming - Tus juegos favoritos", 
    description = "Tus juegos favoritos actualizados de todas las plataformas"} : SeoProps) 
    
{
    //Head son metadatos de HTML para mejor CEO
  return (
    <Head>
        <title> {title} </title>
        <meta property="desciption" content={description} />
        <meta name="author" content={"Israel Tuglema"} />
    </Head>
  )
}
