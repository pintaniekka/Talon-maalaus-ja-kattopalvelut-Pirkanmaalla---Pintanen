import { Suspense } from "react";
import { useParams } from "react-router-dom";
import ArticleLayout from "@/components/article/ArticleLayout";
import { articleBodies } from "@/content/articles";
import { getArticleBySlug, isPublished } from "@/data/articles";
import NotFound from "./NotFound";

/** Yksittäinen artikkeli reitissä /artikkelit/:slug. Ajastettu (tuleva) artikkeli näkyy 404:nä julkaisupäivään asti. */
const Artikkeli = () => {
  const { slug } = useParams();
  const meta = getArticleBySlug(slug);
  const Body = slug ? articleBodies[slug] : undefined;

  if (!meta || !Body || !isPublished(meta)) return <NotFound />;

  return (
    <ArticleLayout meta={meta}>
      <Suspense fallback={<div className="min-h-[40vh]" aria-hidden="true" />}>
        <Body />
      </Suspense>
    </ArticleLayout>
  );
};

export default Artikkeli;
