import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify, humanize } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
const { blog_folder, pagination } = config.settings;
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import Modal from "@layouts/components/modal";




const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;



  useEffect(() => {
    const textTruncate = document.getElementById('truncate');
    if (textTruncate) {
      const titulo = textTruncate.textContent;
      if (titulo.length > 40 ) {
        textTruncate.textContent = titulo.substring(0, 40) + "...";
      }
    }
  }, []);



  return (
    <Base>
      <Modal />
      {/* Banner */}

      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority

        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-left lg:col-6" : "mt-12 text-center lg:mt-0 lg:text-left lg:col-12"}

            >
              <div className="banner-title"
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              <p data-aos="fade-right"
                data-aos-duration="1500"
                data-aos-easing="ease-in-out"
                data-aos-once="false">
                {markdownify(banner.content, "mt-4")}
              </p>
              {banner.button.enable && (
                <Link
                  data-aos="fade-right"
                  data-aos-duration="1900"
                  data-aos-easing="ease-in-out"
                  data-aos-once="false"
                  className="btn btn-primary mt-6 pt-4 hover:bg-orange-800"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false"
              >
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">

        <div className="container">
          {/* filtros */}
          <ul className="row">
            <h2 className="section-title">Filtros</h2>
            {categories.map((category, i) => (
              <li data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false"

                key={`category-${i}`}
                className="mt-4 block lg:col-4 xl:col-3"
              >

                <Link
                  href={`/categories/${category.name}`}
                  className="flex w-full items-center justify-center rounded-lg bg-orange-200 px-4 py-4 font-bold text-dark transition hover:bg-primary hover:text-white  dark:bg-zinc-800 dark:text-darkmode-light dark:hover:bg-primary dark:hover:text-white"
                >


                  {humanize(category.name)} ({category.posts})
                </Link>
              </li>
            ))}
          </ul>
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-8">
              {/* Featured posts */}
              {featured_posts.enable && (
                <div className="section">
                  {markdownify(featured_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border p-6 dark:border-darkmode-border"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="false"
                  >
                    <div className="row">
                      <div className="md:col-6">
                        <Post post={featuredPosts[0]} />
                      </div>
                      <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0 md:col-6">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post, i, arr) => (
                            <div
                              className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 &&
                                "border-b border-border dark:border-darkmode-border"
                                }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <ImageFallback
                                  className="mr-3 h-[85px] rounded object-cover"
                                  src={post.frontmatter.image}
                                  alt={post.frontmatter.title}
                                  width={105}
                                  height={85}
                                />
                              )}
                              <div>
                                <h3 className="h5 mb">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block hover:text-primary"
                                    id="truncate"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                <p className="inline-flex items-center font-bold">
                                  <FaRegCalendar className="mr-1.5" />
                                  {dateFormat(post.frontmatter.date)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Promotion */}
              {promotion.enable && (
                <Link href={promotion.link} className="section block pt-0">
                  <ImageFallback
                    className="h-full w-full"
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(recent_posts.title, "h2", "section-title")}
                  <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-once="false"
                  >
                    <div className="row">
                      {sortPostByDate.slice(0, showPosts).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>
            {/* sidebar */}
            <Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
            />
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
