import { Suspense } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleLayout from "@/components/article/ArticleLayout";
import { articleBodies } from "@/content/articles";
import { getArticleBySlug, isPublished } from "@/data/articles";
import NotFound from "./NotFound";

/**
 * Yksittäinen artikkeli reitissä /artikkelit/:slug. Ajastettu (tuleva) artikkeli
 * näkyy 404:nä julkaisupäivään asti. Jonossa olevan artikkelin voi lukea etukäteen
 * osoitteella /artikkelit/<slug>/?esikatselu=1 (sivu on tällöin noindex).
 */
const Artikkeli = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const meta = getArticleBySlug(slug);
  const Body = slug ? articleBodies[slug] : undefined;
  const published = meta ? isPublished(meta) : false;
  const preview = !published && searchParams.has("esikatselu");

  if (!meta || !Body || (!published && !preview)) return <NotFound />;

  return (
    <ArticleLayout meta={meta} preview={preview}>
      <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
        <Body />
      </Suspense>
    </ArticleLayout>
  );
};

export default Artikkeli;
