










AUI.add(
	'portal-available-languages',
	function(A) {
		var available = {};

		var direction = {};

		

			available['ar_SA'] = 'Arabic (Saudi Arabia)';
			direction['ar_SA'] = 'rtl';

		

			available['eu_ES'] = 'Basque (Spain)';
			direction['eu_ES'] = 'ltr';

		

			available['bg_BG'] = 'Bulgarian (Bulgaria)';
			direction['bg_BG'] = 'ltr';

		

			available['ca_AD'] = 'Catalan (Andorra)';
			direction['ca_AD'] = 'ltr';

		

			available['ca_ES'] = 'Catalan (Spain)';
			direction['ca_ES'] = 'ltr';

		

			available['zh_CN'] = 'Chinese (China)';
			direction['zh_CN'] = 'ltr';

		

			available['zh_TW'] = 'Chinese (Taiwan)';
			direction['zh_TW'] = 'ltr';

		

			available['hr_HR'] = 'Croatian (Croatia)';
			direction['hr_HR'] = 'ltr';

		

			available['cs_CZ'] = 'Czech (Czech Republic)';
			direction['cs_CZ'] = 'ltr';

		

			available['da_DK'] = 'Danish (Denmark)';
			direction['da_DK'] = 'ltr';

		

			available['nl_NL'] = 'Dutch (Netherlands)';
			direction['nl_NL'] = 'ltr';

		

			available['nl_BE'] = 'Dutch (Belgium)';
			direction['nl_BE'] = 'ltr';

		

			available['en_US'] = 'English (United States)';
			direction['en_US'] = 'ltr';

		

			available['en_GB'] = 'English (United Kingdom)';
			direction['en_GB'] = 'ltr';

		

			available['et_EE'] = 'Estonian (Estonia)';
			direction['et_EE'] = 'ltr';

		

			available['fi_FI'] = 'Finnish (Finland)';
			direction['fi_FI'] = 'ltr';

		

			available['fr_FR'] = 'French (France)';
			direction['fr_FR'] = 'ltr';

		

			available['gl_ES'] = 'Gallegan (Spain)';
			direction['gl_ES'] = 'ltr';

		

			available['de_DE'] = 'German (Germany)';
			direction['de_DE'] = 'ltr';

		

			available['el_GR'] = 'Greek (Greece)';
			direction['el_GR'] = 'ltr';

		

			available['iw_IL'] = 'Hebrew (Israel)';
			direction['iw_IL'] = 'rtl';

		

			available['hi_IN'] = 'Hindi (India)';
			direction['hi_IN'] = 'ltr';

		

			available['hu_HU'] = 'Hungarian (Hungary)';
			direction['hu_HU'] = 'ltr';

		

			available['in_ID'] = 'Indonesian (Indonesia)';
			direction['in_ID'] = 'ltr';

		

			available['it_IT'] = 'Italian (Italy)';
			direction['it_IT'] = 'ltr';

		

			available['ja_JP'] = 'Japanese (Japan)';
			direction['ja_JP'] = 'ltr';

		

			available['ko_KR'] = 'Korean (South Korea)';
			direction['ko_KR'] = 'ltr';

		

			available['lo_LA'] = 'Lao (Laos)';
			direction['lo_LA'] = 'ltr';

		

			available['nb_NO'] = 'Norwegian Bokmål (Norway)';
			direction['nb_NO'] = 'ltr';

		

			available['fa_IR'] = 'Persian (Iran)';
			direction['fa_IR'] = 'rtl';

		

			available['pl_PL'] = 'Polish (Poland)';
			direction['pl_PL'] = 'ltr';

		

			available['pt_BR'] = 'Portuguese (Brazil)';
			direction['pt_BR'] = 'ltr';

		

			available['pt_PT'] = 'Portuguese (Portugal)';
			direction['pt_PT'] = 'ltr';

		

			available['ro_RO'] = 'Romanian (Romania)';
			direction['ro_RO'] = 'ltr';

		

			available['ru_RU'] = 'Russian (Russia)';
			direction['ru_RU'] = 'ltr';

		

			available['sr_RS'] = 'Serbian (Serbia)';
			direction['sr_RS'] = 'ltr';

		

			available['sr_RS_latin'] = 'Serbian (Serbia,latin)';
			direction['sr_RS_latin'] = 'ltr';

		

			available['sl_SI'] = 'Slovenian (Slovenia)';
			direction['sl_SI'] = 'ltr';

		

			available['sk_SK'] = 'Slovak (Slovakia)';
			direction['sk_SK'] = 'ltr';

		

			available['es_ES'] = 'Spanish (Spain)';
			direction['es_ES'] = 'ltr';

		

			available['sv_SE'] = 'Swedish (Sweden)';
			direction['sv_SE'] = 'ltr';

		

			available['tr_TR'] = 'Turkish (Turkey)';
			direction['tr_TR'] = 'ltr';

		

			available['uk_UA'] = 'Ukrainian (Ukraine)';
			direction['uk_UA'] = 'ltr';

		

			available['vi_VN'] = 'Vietnamese (Vietnam)';
			direction['vi_VN'] = 'ltr';

		

		Liferay.Language.available = available;
		Liferay.Language.direction = direction;
	},
	'',
	{
		requires: ['liferay-language']
	}
);