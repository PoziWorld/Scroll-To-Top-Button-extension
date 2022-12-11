# Scroll To Top Button version history (changelog)

> [Follow Scroll To Top Button updates](README.md#scroll-to-top-button-on-social-networks)

> Help [translate Scroll To Top Button](https://www.transifex.com/poziworld/scroll-to-top-button/)

> [Become a patron](https://www.patreon.com/bePatron?c=1906606)

## v11.0.1

### Fixed

* Added back a seemingly redundant string to the translation files to comply with the Chrome Web Store and Microsoft Store requirement.

---

## v11.0.0

### New

* Scroll To Top Button [translated](https://www.transifex.com/poziworld/scroll-to-top-button "Help translate Scroll To Top Button") into Bulgarian.

  > Thank you, [ozzy1bg (Валери Владимиров)](https://www.transifex.com/user/profile/ozzy1bg/)!

* Scroll To Top Button [translated](https://www.transifex.com/poziworld/scroll-to-top-button "Help translate Scroll To Top Button") into Japanese.

  > Thank you, [noby (oshima yoshinobu)](https://www.transifex.com/user/profile/noby/)!

* Scroll To Top Button partially [translated](https://www.transifex.com/poziworld/scroll-to-top-button "Help translate Scroll To Top Button") into Danish.

  > Thank you, [Roslund (Torben Roslund)](https://www.transifex.com/user/profile/Roslund/)!

### Improved

* Updated Chinese (China), Galician, Czech, and Polish translations.

  > New translators: [LiLuwei (Luwei Li)](https://www.transifex.com/user/profile/LiLuwei/), [Liu.Hao (浩 刘)](https://www.transifex.com/user/profile/Liu.Hao/), [ZDHJ9EZW (Ziyang Liu)](https://www.transifex.com/user/profile/ZDHJ9EZW/), [Vikarna (Nick NY)](https://www.transifex.com/user/profile/Vikarna/).

* Simplified the Options page and the “Active tab settings” page by removing the secondary information.

### Changed

* Removed the Amazon referral program.

* Switched the software model and license.

  > Scroll To Top Button is [fair-code](https://faircode.io) distributed under the [Sustainable Use License](LICENSE.md).

---

## v10.0.4

### Fixed

* Changing the button mode to “Keyboard only” in Options wouldn't work.

  > Issue reported by Noah via the [feedback form](https://goo.gl/forms/QMZFZfgKjQHOnRCX2).

---

## v10.0.3

### Fixed

* Button(s) would show up in full screen on YouTube in Chrome 87 in some cases.

  > Issue reported by Lucian Andries via the [Support tab](https://chrome.google.com/webstore/detail/scroll-to-top-button/chinfkfmaefdlchhempbfgbdagheknoj/support).

### Improved

* Page scrolling might become smoother in some cases.

---

## v10.0.2

### Improved

* Extension should no longer show an exception after user clicks “Revoke permissions” in Options.

---

## v10.0.1

### Improved

* Per Mozilla requirement, updated a third-party library that helps sanitize HTML.

---

## v10.0.0

### Breaking changes

* If you select an Expert group button mode on one computer, synchronize your extensions with your browser profile, and log into your browser profile on another computer or/and in a different version of the browser, then the Expert group button mode will not get automatically applied there, as the required permissions you granted on one computer do not get synchronized with your browser profile, and will be automatically converted to a corresponding Advanced group button mode.

  _Go to Options to grant the required permissions and enable your favorite Expert group button mode_.

### Fixed

* Settings import or browser sync of an Expert group button mode would trigger an exception asking users to report it to the developer.

  > Thank you those of you who have reported the issue.

  > A big thank-you goes to those of you who have provided additional information and/or assistance in debugging the issue: _Åke Svensson, Willem Dijkstra, Jacinta Yap, Terry Bennett, Julio C., Alfredo Gil, John Winter_.

  > A very special thank-you goes to _Phil Reilly ([@pjpreilly](https://github.com/pjpreilly))_ for getting to the bottom of the issue!

* In Options, “Restore defaults” and “Author's settings” buttons wouldn't work.

### Improved

* In Options, extension no longer requests to reload it on a button mode group change.

---

## v9.4.6

### Attempting to fix

* Some users experience an issue where after browser restart a permission allowing to inject the button(s) on all URLs is no longer there for some reason (haven't been able to reproduce to fix it).

  > Based on feedback via the [feedback form](https://goo.gl/forms/QMZFZfgKjQHOnRCX2).

---

## v9.4.5

### Improved

* Container style attribute change self-defense mechanism will no longer warn about cursor.

  > Based on anonymous feedback via the [feedback form](https://goo.gl/forms/QMZFZfgKjQHOnRCX2).

---

## v9.4.4

### Improved

* Container style attribute change self-defense mechanism will no longer warn about some additional font-related changes (line-height).

  > Based on feedback from Lucian Andries.

---

## v9.4.3

### Changed

* When the extension requests to report a style attribute change of the container issue, it will now add more debugging information: the value of the style attribute of the container and the extension version.

  > Based on feedback from Lucian Andries.

---

## v9.4.2

### Changed

* When the extension requests to report an Expert mode activation issue, it will now add more debugging information.

* Added a delay before the extension reload on a mode change to give extra time to the extension to finish all the necessary tasks.

* Made a loading indicator screen show up during the extension reload to prevent any changes.

* Upgraded a behind-the-scenes library for the cross-browser extension support.

---

## v9.4.1

### Improved

* Container style attribute change self-defense mechanism will no longer warn about some font-related changes (color, font-family, font-size, font-style, font-weight, text-decoration).

  > Based on feedback from Lucian Andries.

* More extension options and ways to use it are now mentioned in the extension description.

---

## v9.4.0

### New

* Added a self-defense mechanism against website scripts and other extensions (addons) that try to change the look of Scroll To Top Button.

  > Based on feedback from Lucian Andries via the [Support tab](https://chrome.google.com/webstore/detail/scroll-to-top-button/chinfkfmaefdlchhempbfgbdagheknoj/support).

### Improved

* Extension will now request to report the issue when it fails to activate an Expert mode by sending over some debugging information to the developer.

  > Based on feedback from phil reilly via the [Support tab](https://chrome.google.com/webstore/detail/scroll-to-top-button/chinfkfmaefdlchhempbfgbdagheknoj/support) and Dubravka, Åke Svensson, Willem Dijkstra, and an anonymous user via the [feedback form](https://goo.gl/forms/QMZFZfgKjQHOnRCX2).

---

## v9.3.0

### New

* Added links to the contact form in Options, so users can report issues and get help easier.

  > Based on [feedback](https://www.reddit.com/r/waterfox/comments/e4atfn/scroll_to_top_button_no_longer_working_wfclassic/fecdltf) from [KahRed17](https://www.reddit.com/user/KahRed17/).

### Improved

* Made Active tab settings page responsive, so it's easier to work with in Firefox on Android.

### Changed

* Made context menu setting in Options Expert-only (not shown when a Basic or Advanced button mode is active).

---

## v9.2.0

### Improved

* More user-friendly explanation of different button modes in Options.

---

## v9.1.1

### Changed

* Updated Microsoft Edge-related URLs.

---

## v9.1.0

### New

* Ability to scroll to top via context (right-click) menu. 🤷

  > Idea by SMTB 1963.

---

## v9.0.1

### Fixed

* In Firefox, on the Options page, wouldn't save the button settings if the newly chosen button mode is from another group.

  > [Issue](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/10) reported by [Graham Perrin (grahamperrin)](https://github.com/grahamperrin).

* In Waterfox, on the Options page, would often show “i18n services not initialized” instead of any text.

  > [Issue](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/11) reported by [Graham Perrin (grahamperrin)](https://github.com/grahamperrin).

---

## v9.0.0

### Breaking changes

* When upgrading from version 8 or earlier, an on-demand button mode (see advanced button modes in Options) is enforced.

(_Go to Options to switch back to an always-on button_.)

### New

* No more required permissions upon installation!

  > Based on feedback from a Firefox user.

* Button modes: an on-demand button and an extension icon as a button (see basic button modes in Options).

  > Extension icon as a button idea by [Murat Karayel](https://www.facebook.com/schipht) (via Facebook) and Mike Glenn (via email).

### Improved

* In Options, a confirmation window is now shown before the extension gets reloaded.

### Changed

* In Firefox, the Options page now gets open in a new tab.

---

## v8.1.4

### Fixed

* blog.webtor.io's CSS would add a background color to the buttons container, rendering the whole page unusable.

  > Issue reported by kleuton pereira ricarte at the Chrome Web Store.

---

## v8.1.3

### Fixed

* Second arrow would point in an incorrect direction when Togglific is enabled in Waterfox Classic.

  > [Issue](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/9) reported by [Graham Perrin (grahamperrin)](https://github.com/grahamperrin).

---

## v8.1.2

### Fixed

* Extension wouldn't work in Waterfox Classic v2019.10.

  > [Issue](https://www.reddit.com/r/waterfox/comments/e4atfn/scroll_to_top_button_no_longer_working_wfclassic/) reported by [KahRed17](https://www.reddit.com/user/KahRed17/).

  > [Issue](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/7) reported by [Graham Perrin (grahamperrin)](https://github.com/grahamperrin).

  > [Help](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/7#issuecomment-569833223) from [lucknaumann](https://github.com/lucknaumann).

---

## v8.1.1

### Fixed

* Extension would cause www.lesswrong.com's scripts to remove page elements in Firefox.

  > [Issue](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/6) reported by [markran](https://github.com/markran).

---

## v8.1.0

### New

* Options page now gets open in a new tab instead of being embedded into the extensions management page.

  > Based on [feedback](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/4#issuecomment-544360596) from [MagicAndre1981](https://github.com/MagicAndre1981) and Ronen TheLion.

### Fixed

* Button look would get affected by website's CSS.

  > Issue reported by phil reilly.

* Extension wouldn't work in Chrome v49.

  > Issue reported by Julian aka Ronen TheLion.

* Extension wouldn't work in Firefox.

* Options page would close sometimes even when language not updated.

---

## v8.0.0

### New

* Ability to set a custom button size (min – 1px, max – 500px) in Options.

  > [Idea](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/2) by [luikhh](https://github.com/luikhh).

* Ability to click an element underneath/behind the button.

  > Before, you might have wanted to click an element located underneath/behind the button, but the button was in the way and there was no way to get rid of the button.

  > Now, you can hold a Ctrl (Control) or Shift key on your keyboard and hover over the button and the button will disappear, allowing you to comfortably click the previously inaccessible element.

  > Idea by [Natalia Smirnova](https://www.transifex.com/user/profile/natasmirnova1392/).

### Improved

* Updated Chinese (China), Dutch (Netherlands), Galician, and Turkish translations.

  > Thank you, [pluwen](https://www.transifex.com/user/profile/pluwen/), [Bright X](https://www.transifex.com/user/profile/whaat7er/), [Michael Atsma](https://www.transifex.com/user/profile/MichaelAtsma/), [antiparvos](https://www.transifex.com/user/profile/antiparvos/), [Iváns](https://www.transifex.com/user/profile/Iváns/), [Eren Tas](https://www.transifex.com/user/profile/E.Tas/)!

### Fixed

* Prevent a possible exception in tab checking logic.

  > [Issue](https://github.com/PoziWorld/Scroll-To-Top-Button-extension/issues/4) reported by [MagicAndre1981](https://github.com/MagicAndre1981).

* In some cases, the button would not go back to the transparent state when not active.

  > [Issue](https://vk.com/wall-80569939_47?reply=52&thread=48) reported by [Anton Kizernis](https://vk.com/kizernis).

### Changed

* Bumped minimum supported Chrome version to 49 (last version supported on Windows XP and Mac OS X Snow Leopard).

---

## v7.3.0

### New

* Scroll To Top Button [translated](https://www.transifex.com/poziworld/scroll-to-top-button "Help translate Scroll To Top Button") into Polish.

  > Thank you, [MusicInMe_TH (Ireek)](https://www.transifex.com/user/profile/MusicInMe_TH/)!

* Scroll To Top Button [translated](https://www.transifex.com/poziworld/scroll-to-top-button "Help translate Scroll To Top Button") into Turkish.

  > Thank you, [E.Tas (Eren Tas)](https://www.transifex.com/user/profile/E.Tas/)!

---

## v7.2.0

### New

* [Scroll To Top Button translated](https://www.transifex.com/poziworld/scroll-to-top-button) into Galician. / [Scroll To Top Button traducido](https://www.transifex.com/poziworld/scroll-to-top-button) ao galego.

  > Thank you, [antiparvos](https://www.transifex.com/user/profile/antiparvos/) and [Iváns](https://www.transifex.com/user/profile/Iv%C3%A1ns/)!

* Ability to change language in Options.

---

## v7.1.0

### New

* Ability to specify scroll up/down speed value in milliseconds instead of selecting a pre-set one.

  > Idea by [Phil Reilly](https://www.facebook.com/pjpreilly).

---

## v7.0.4

### Changed

* Updated Amazon referral IDs.

  > Support project development by making us your referral!
    Go to Amazon, click the Scroll To Top Button icon next to the address bar, click “I want to help”.

---

## v7.0.3

### Fixed

* Correct URL for Edge extension in Options.

### Changed

* Don't show Other Projects section to Edge users.

---

## v7.0.2

### Changed

* Don't show Patreon call-to-action to Edge users.

---

## v7.0.1

### Improved

* Extension no longer outputs log to the DevTools Console on a page.

  > Issue reported by [Ben Russell](https://plus.google.com/114806371046314371796).

---

## v7.0.0

### New

* Scroll To Top Button works in [Firefox](https://addons.mozilla.org/firefox/addon/scroll-to-top-button-extension/) & Edge* now, too!

  > Idea by [Michael Yarlot](https://www.facebook.com/michael.yarlot), [Fabrizio Morrone](https://twitter.com/FabrizioMorron3), [Keluen Mier](https://plus.google.com/108629557834198154933).

  \* We reached out to Microsoft for approval to have our extension in the Microsoft Store.

* Scroll To Top Button settings are now synchronized with your browser Sync account.

### Improved

* Updated Dutch (Netherlands) & Chinese (China) translation.

  > Thank you, [Michael Atsma](https://www.transifex.com/user/profile/MichaelAtsma/) & [Pluwen](https://www.transifex.com/user/profile/pluwen/)!

---

## v6.7.2

### Improved

* Make Scroll To Top Button work on Google News.

  > Issue reported by [phil reilly](https://plus.google.com/113610250929060370881).

---

## v6.7.1

### Fixed

* Options page would flicker when language is not English.

  > Issue reported by [Pampero Cool](https://plus.google.com/+MarcFoces), [Michael Atsma](https://www.transifex.com/user/profile/MichaelAtsma/).

---

## v6.7.0

### New

* [Scroll To Top Button translated](https://www.transifex.com/poziworld/scroll-to-top-button) into Dutch (Netherlands). / [Scroll To Top Button vertaald](https://www.transifex.com/poziworld/scroll-to-top-button) naar het Nederlands.

  > Thank you, [Michael Atsma](https://www.transifex.com/user/profile/MichaelAtsma/)!

* Scroll To Top Button partially translated into Czech.

  > Thank you, [Michal “Bedami” Bedáň](https://www.transifex.com/user/profile/Bedami/)!

### Fixed

* Button wouldn't have the right size on some pages.

  > Issue reported by [Devia Jeff (Kslr)](https://plus.google.com/111793170384760579738).

---

## v6.6.0

### New

* [Scroll To Top Button translated](https://www.transifex.com/poziworld/scroll-to-top-button) into Russian. / [Scroll To Top Button переведён](https://www.transifex.com/poziworld/scroll-to-top-button) на русский.

  > Thank you, [reidel (Пётр Михайлишин)](https://www.transifex.com/user/profile/reidel/) and [aleev.insmile (Руслан Алеев)](https://www.transifex.com/user/profile/aleev.insmile/)!

### Improved

* You can now [support Scroll To Top Button development](https://commerce.coinbase.com/checkout/60af24ed-830b-4ef3-b501-caae08411af5) with Bitcoin (BTC), Bitcoin Cash (BCH), Ethereum (ETH), and Litecoin (LTC).

### Fixed

* Amazon badge notification and its settings wouldn't work.

  Make us your referral – support project development in one click!
  > Go to Amazon and click the Scroll To Top Button icon next to the address bar to learn the details.

---

## v6.5.2

### Improved

* Make Scroll To Top Button work on sites with full-screen iframes (e.g., ZeroNet).

  > Issue reported by [赵名字](https://plus.google.com/102362001786834990486).
* Disable Scroll To Top Button on Transifex when viewing/editing translations.

---

## v6.5.1

### Fixed

* Unable to scroll Options page on smaller screens.

  > Bug reported by [Jeff Seymour](https://plus.google.com/101598275677991812643) & [Michael Rhum](https://plus.google.com/101346129192192436780).

---

## v6.5.0

### New

* Shop on Amazon?

  Make us your referral – support project development in one click!
  > Go to Amazon and click the Scroll To Top Button icon next to the address bar to learn the details.

---

## v6.4.8

### Fixed

* “Dual arrows” mode wouldn't work properly on Bing and, sometimes, Google search result pages.

  > Bug reported by [Miss Vasquez](https://plus.google.com/101122222877588657617).

---

## v6.4.7

### Fixed

* In case of multiple open windows of the same browser profile, the browser action (a popup that shows up when the Scroll To Top Button icon next to the address bar is clicked on) might show a wrong URL.

---

## v6.4.6

### Fixed

* Button(s) wouldn't hide in fullscreen mode.

  > Bug reported by [Сергей Кателина](https://plus.google.com/114544103485939423643).

---

## v6.4.5
    * Improved: don't show button(s) when JavaScript is disabled.
      Inspired by uncleal (Opera add-ons) and another user (Chrome Web Store).

## v6.4.4
    * Improved: changing a context menu setting in Options no longer requires a browser restart.
      Inspired by Shirley Long.

## v6.4.3
    * Fixed: button design would always reset to Tumbler blue on Options page load.
      Bug reported by Dennis Long.

## v6.4.2
    * Scroll To Top Button is now available in Simplified Chinese.
      Translation by Pluwen.

      Scroll To Top Button 有简体中文版了，来自 Pluwen 的翻译。

## v6.4.1
    * New: added a Save button in Options.
      Idea by S Cc.

## v6.4.0
    * Fixed: dropdown menus in Options wouldn't work properly.
      Bug reported by Yy Simonz, Nadin Nasalskaya, Aimee Gormady, Craig Domingue.

## v6.3.0
    * Fixed: wouldn't work in Gmail.
      Bug reported by Ken 010107.

## v6.2.1
    * New: added a setting in Options to change a Home & End keys action.
      Idea by Emre MUTLU.
    * Fixed: the arrows would show up on page in Keyboard only mode.
      Bug reported by Lee Brown.
    * Fixed: a context menu wouldn't show up on page when enabled in Options.
      Bug reported by Lee Brown.
