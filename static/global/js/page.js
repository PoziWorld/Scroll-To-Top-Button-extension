/* =============================================================================

  Globals

 ============================================================================ */

const
    strNotShownElementClass       = 'none'
  ;

// code.tutsplus.com/tutorials/from-jquery-to-javascript-a-reference--net-23703
var addEvent = (function () {
  var filter = function( el, type, fn ) {
    for ( var i = 0, len = el.length; i < len; i++ )
      addEvent( el[i], type, fn );
  };

  if ( document.addEventListener )
    return function ( el, type, fn ) {
      if ( el && el.nodeName || el === window )
        el.addEventListener( type, fn, false );
      else if ( el && el.length )
        filter( el, type, fn );
    };
})();

/* =============================================================================

  Page

 ============================================================================ */

var Page = {

  /**
   * Provide text in the appropriate language for HTML elements that expect it.
   *
   * @param {string} [strPageName] - The name of the page this is called from.
   * @param {string} [strCustomSelectorParent] - If only part of the page needs to be localized.
   */

  localize: function ( strPageName, strCustomSelectorParent ) {
    var boolIsCustomSelectorParentPresent =
          typeof strCustomSelectorParent === 'string'
      , strSelectorPrefix =
          boolIsCustomSelectorParentPresent ? strCustomSelectorParent + ' ' : ''
      , $allLocalizableElements =
          document.querySelectorAll( strSelectorPrefix + '[i18n-content]' )
      ;

    for (
      var i = 0, intLocalizableElements = $allLocalizableElements.length;
      i < intLocalizableElements;
      i++
        ) {
        var $localizableElement = $allLocalizableElements[ i ]
          , strI18 = $localizableElement.getAttribute( 'i18n-content' )
          , strMessage = window.poziworldExtension.i18n.getMessage( strI18 )
          ;

        if ( $localizableElement.nodeName === 'LABEL' ) {
          $localizableElement.innerHTML =  $localizableElement.innerHTML + strMessage;
        }
        else if ( $localizableElement.nodeName === 'A' ) {
          $localizableElement.innerHTML = strMessage;

          if ( $localizableElement.href === '' ) {
            $localizableElement.href =  window.poziworldExtension.i18n.getMessage( strI18 + 'Href' );
          }
        }
        else if ( $localizableElement.nodeName === 'IMG' ) {
          $localizableElement.alt = strMessage;
        }
        else if ( ! $localizableElement.classList.contains( 'i18nNoInner' ) ) {
          $localizableElement.innerHTML = strMessage;
        }

        if ( $localizableElement.classList.contains( 'i18nTitle' ) ) {
          const strI18nTitle = $localizableElement.getAttribute( 'data-i18n-title' );
          let strTitle = strMessage;

          if ( window.poziworldExtension.utils.isNonEmptyString( strI18nTitle ) ) {
            strTitle = window.poziworldExtension.i18n.getMessage( strI18nTitle );
          }

          $localizableElement.setAttribute( 'title', strTitle );
        }
        else {
          const tooltip = $localizableElement.getAttribute( 'data-i18n-tooltip' );

          if ( window.poziworldExtension.utils.isNonEmptyString( tooltip ) ) {
            $localizableElement.setAttribute( 'title', window.poziworldExtension.i18n.getMessage( tooltip ) );
          }
        }
    }

    if ( !boolIsCustomSelectorParentPresent ) {
      document.title = window.poziworldExtension.i18n.getMessage( strPageName + 'PageTitle' );
    }
  }
  ,

  /**
   * Insert the provided data into the template
   *
   * @type    method
   * @param   strTemplateId
   *            Element ID where template is "stored"
   * @param   objData
   *            Data to populate into template
   * @return  string
   **/
  template : function( strTemplateId, objData ) {
    return document.getElementById( strTemplateId )
            .innerHTML
              .replace(
                  /%(\w*)%/g
                , function( m, key ) {
                    return objData.hasOwnProperty( key ) ? objData[ key ] : '';
                  }
              );
  }
  ,

  /**
   * Let user know something was successful
   *
   * @type    method
   * @param   $element
   *            Element which will be a success indicator
   * @return  void
   **/
  showSuccess : function( $element ) {
    var arrClassList = $element.classList;

    arrClassList.remove( 'show' );

    // Does not work the second time if there is no timeout
    setTimeout(
        function() {

          arrClassList.add( 'reset' );
          arrClassList.remove( 'reset' );
          arrClassList.add( 'show' );
        }
      , 10
    );
  }
  ,

  /**
   * Make element show up or disappear
   *
   * @type    method
   * @param   $element
   *            Element which will be a success indicator
   * @return  void
   **/
  toggleElement : function( $element, boolShow ) {
    var boolHidden
      , boolAriaHidden
      ;

    if ( typeof boolShow !== 'boolean' ) {
      $element.classList.toggle( strNotShownElementClass );
      boolHidden = ! $element.hidden;
      boolAriaHidden = ! $element.getAttribute( 'aria-hidden' );
    }
    else if ( boolShow ) {
      $element.classList.remove( strNotShownElementClass );
      boolHidden = false;
      boolAriaHidden = false;
    }
    else {
      $element.classList.add( strNotShownElementClass );
      boolHidden = true;
      boolAriaHidden = true;
    }

    $element.hidden = boolHidden;
    $element.setAttribute( 'aria-hidden', boolAriaHidden );
  }
  ,

  /**
   * If something should not be shown in Opera, remove them
   *
   * @type    method
   * @param   No Parameters Taken
   * @return  void
   **/
  hideInOpera : function() {
    if ( bowser.name === 'Opera' ) {
      var $elements = document.getElementsByClassName( strHideInOperaClass );

      for ( var i = ( $elements.length - 1 ); i >= 0; i-- ) {
        var $element = $elements[i];

        $element.parentNode.removeChild( $element );
      }
    }
  }
};
