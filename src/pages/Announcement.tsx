import kaohsiung01 from '../features/announcement/assets/kaohsiung-01.jpg'
import kaohsiung02 from '../features/announcement/assets/kaohsiung-02.jpg'
import kaohsiung03 from '../features/announcement/assets/kaohsiung-03.jpg'
import kaohsiung04 from '../features/announcement/assets/kaohsiung-04.jpg'
import registration01 from '../features/announcement/assets/registration-01.jpg'
import registration02 from '../features/announcement/assets/registration-02.jpg'
import registration03 from '../features/announcement/assets/registration-03.jpg'
import registration04 from '../features/announcement/assets/registration-04.jpg'

const photoClass = 'block h-full w-full object-contain'
const captionClass =
  'absolute bottom-3 left-3 rounded-full bg-black/35 px-3 py-1.5 font-body text-[11px] tracking-[0.08em] text-white backdrop-blur-sm sm:bottom-4 sm:left-4 sm:text-xs'
const galleryItemClass = 'mb-3 inline-block w-full break-inside-avoid align-top sm:mb-5 md:mb-6'

export default function Announcement() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f9f2ec] text-[#4b2924]">
      <section className="relative flex flex-col items-center justify-center px-6 pb-12 pt-16 text-center sm:pb-16 sm:pt-20 md:px-12 md:pb-8 md:pt-24">
        <div
          aria-hidden="true"
          className="absolute -top-36 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#e6a095]/25 blur-3xl"
        />
        <p className="relative font-body text-xs tracking-[0.35em] text-brand-700/70">
          A LITTLE PIECE OF HAPPY NEWS
        </p>
        <h1 aria-label="我們結婚了" className="relative mt-8 text-5xl leading-none sm:text-6xl">
          <span aria-hidden="true">🤵❤️👰</span>
        </h1>
        <div className="relative my-8 h-px w-12 bg-brand-500/60" />
        <p className="relative font-display text-2xl tracking-[0.08em] sm:text-3xl">
          昱德（Lloyd） <span className="mx-2 text-brand-500">&amp;</span> 秀慧（Yuri）
        </p>
        <p className="relative mt-6 max-w-md font-body text-[15px] leading-8 text-[#6c4b45] sm:text-base">
          十二年的日常，慢慢長成了往後的一輩子。
          <br />
          很開心能把這份喜悅，也分享給收到這份心意的你。
        </p>
        <div aria-hidden="true" className="relative mt-12 h-px w-16 bg-brand-500/35" />
      </section>

      <section
        id="kaohsiung"
        className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-8 sm:pb-32 md:max-w-[1240px] md:px-10 md:pb-40 md:pt-4"
      >
        <header className="mx-auto mb-10 max-w-xl text-center sm:mb-16 md:grid md:max-w-none md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end md:gap-16 md:text-left">
          <div>
            <p className="font-body text-xs tracking-[0.32em] text-brand-700/60">
              2026.06.26 · KAOHSIUNG
            </p>
            <h2 className="mt-4 font-display text-3xl text-brand-700 sm:text-5xl">
              回到故事的開始
            </h2>
          </div>
          <p className="mt-6 font-body text-[15px] leading-8 text-[#76554f] sm:text-base md:mt-0 md:border-l md:border-brand-500/25 md:pl-10">
            回到當初認識的地方——高雄。
            <br className="hidden md:block" />
            從貳樓茶館、中山大學、御典茶，一路走到西子灣沙灘。
          </p>
        </header>

        <div className="columns-1 md:columns-2 md:gap-6">
          <figure
            className={`group relative col-span-2 aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-[#ded0c5] shadow-[0_18px_50px_rgba(91,47,41,0.08)] sm:rounded-[1.75rem] ${galleryItemClass}`}
          >
            <img
              src={kaohsiung01}
              alt="昱德與秀慧在高雄街角牽手回望的婚紗照"
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className={`${photoClass} object-[60%_50%]`}
            />
            <figcaption className={captionClass}>貳樓茶館（現一二三亭）</figcaption>
          </figure>

          <figure
            className={`group relative aspect-[2/3] overflow-hidden rounded-[1.25rem] bg-[#ded0c5] shadow-[0_18px_50px_rgba(91,47,41,0.08)] sm:rounded-[1.75rem] ${galleryItemClass}`}
          >
            <img
              src={kaohsiung02}
              alt="昱德與秀慧在高雄紅磚建築階梯上的婚紗照"
              width={933}
              height={1400}
              loading="lazy"
              decoding="async"
              className={`${photoClass} object-center`}
            />
            <figcaption className={captionClass}>中山大學</figcaption>
          </figure>
          <figure
            className={`group relative aspect-[2/3] overflow-hidden rounded-[1.25rem] bg-[#ded0c5] shadow-[0_18px_50px_rgba(91,47,41,0.08)] sm:rounded-[1.75rem] ${galleryItemClass}`}
          >
            <img
              src={kaohsiung03}
              alt="昱德與秀慧在高雄茶店前合影的婚紗照"
              width={933}
              height={1400}
              loading="lazy"
              decoding="async"
              className={`${photoClass} object-center`}
            />
            <figcaption className={captionClass}>御典茶</figcaption>
          </figure>

          <figure
            className={`group relative col-span-2 aspect-[2/3] overflow-hidden rounded-[1.25rem] bg-[#ded0c5] shadow-[0_18px_50px_rgba(91,47,41,0.08)] sm:rounded-[1.75rem] ${galleryItemClass}`}
          >
            <img
              src={kaohsiung04}
              alt="昱德與秀慧在高雄海邊開心跳起的婚紗照"
              width={1067}
              height={1600}
              loading="lazy"
              decoding="async"
              className={`${photoClass} object-[50%_76%]`}
            />
            <figcaption className={captionClass}>西子灣沙灘</figcaption>
          </figure>
        </div>
      </section>

      <section id="registration" className="bg-[#efe4da]">
        <div className="mx-auto max-w-5xl px-4 pb-24 pt-24 sm:px-8 sm:pb-32 sm:pt-32 md:max-w-[1240px] md:px-10 md:pb-40 md:pt-40">
          <header className="mx-auto mb-10 max-w-xl text-center sm:mb-16 md:grid md:max-w-none md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end md:gap-16 md:text-left">
            <div>
              <p className="font-body text-xs tracking-[0.32em] text-brand-700/60">
                2026.07.31 · SHILIN
              </p>
              <h2 className="mt-4 font-display text-3xl text-brand-700 sm:text-5xl">
                新身份的開始
              </h2>
            </div>
            <p className="mt-6 font-body text-[15px] leading-8 text-[#76554f] sm:text-base md:mt-0 md:border-l md:border-brand-500/25 md:pl-10">
              在士林戶政事務所完成結婚登記。
              <br className="hidden md:block" />
              從這一天起，我們有了新的身份。
            </p>
          </header>

          <div className="columns-1 md:columns-2 md:gap-6">
            <figure
              className={`group col-span-2 aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-[#ded0c5] shadow-[0_18px_50px_rgba(91,47,41,0.1)] sm:rounded-[1.75rem] ${galleryItemClass}`}
            >
              <img
                src={registration01}
                alt="昱德與秀慧在士林戶政事務所交換戒指"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className={`${photoClass} object-[55%_50%]`}
              />
            </figure>

            <figure
              className={`group aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-brand-100 shadow-[0_18px_50px_rgba(91,47,41,0.1)] sm:rounded-[1.75rem] ${galleryItemClass}`}
            >
              <img
                src={registration02}
                alt="昱德與秀慧坐在公園鞦韆上的登記寫真"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className={`${photoClass} object-[52%_50%]`}
              />
            </figure>
            <figure
              className={`group aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-brand-100 shadow-[0_18px_50px_rgba(91,47,41,0.1)] sm:rounded-[1.75rem] ${galleryItemClass}`}
            >
              <img
                src={registration03}
                alt="昱德與秀慧戴著墨鏡的俏皮登記寫真"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className={`${photoClass} object-[68%_50%]`}
              />
            </figure>

            <figure
              className={`group col-span-2 aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-brand-100 shadow-[0_18px_50px_rgba(91,47,41,0.1)] sm:rounded-[1.75rem] ${galleryItemClass}`}
            >
              <img
                src={registration04}
                alt="昱德與秀慧與紅色囍字合影的登記寫真"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className={`${photoClass} object-center`}
              />
            </figure>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-700/10 px-6 py-14 text-center sm:py-16">
        <p className="font-body text-xs tracking-[0.28em] text-brand-700/55">
          LLOYD &amp; YURI · 2026
        </p>
      </footer>
    </main>
  )
}
