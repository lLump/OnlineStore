export type FAQCategory = {
	id: string;
	title: string;
	questions: { question: string; answer: string }[];
};

export const faqCategories: FAQCategory[] = [
	{
		id: "orders",
		title: "Objednávky",
		questions: [
			{
				question: "Jak mohu zadat objednávku?",
				answer:
					"Prohlédněte si produkty, přidejte je do košíku a pokračujte k pokladně. Celý proces platby vás provede krok za krokem.",
			},
			{
				question: "Mohu po odeslání objednávku upravit nebo zrušit?",
				answer:
					"Po odeslání objednávky už se obvykle upravovat nedá. Pokud objednávka ještě nebyla zpracována, ozvěte se nám co nejdříve a my uděláme maximum, abychom vašemu přání vyšli vstříc.",
			},
			{
				question: "Jak dlouho trvá zpracování objednávky?",
				answer:
					"Většina objednávek se zpracuje do 1–3 pracovních dnů. Doba zpracování se může lišit podle dostupnosti zboží a objemu objednávek. Po odeslání vám přijde potvrzující e-mail.",
			},
			{
				question: "Mohu si vyžádat fakturu k objednávce?",
				answer:
					"Ano. Pokud potřebujete fakturu, zadejte prosím fakturační údaje přímo v pokladně. Faktura vám přijde e-mailem spolu s potvrzením objednávky.",
			},
			{
				question: "Mohu k objednávce přidat zvláštní pokyny?",
				answer:
					"Pokud je to k dispozici, můžete během objednávky přidat poznámku nebo zvláštní pokyny. Pole s poznámkou najdete před dokončením nákupu.",
			},
		],
	},
	{
		id: "payments",
		title: "Platba",
		questions: [
			{
				question: "Jaké platební metody přijímáte?",
				answer:
					"Přijímáme všechny běžné platební karty a další platební metody, které nabízí naše bezpečné platební řešení. Dostupné možnosti se zobrazí přímo v pokladně.",
			},
			{
				question: "Jsou mé platební údaje v bezpečí?",
				answer:
					"Určitě. Všechny platby zpracovává certifikovaný poskytovatel plateb dle standardu PCI. Vaše úplné údaje z karty nikdy neukládáme na našich serverech.",
			},
			{
				question: "Platba se nezdařila. Co mám dělat?",
				answer:
					"Nejdřív zkontrolujte, že jsou údaje karty správné a že máte dostatečný zůstatek. Pokud problém přetrvává, zkuste jinou platební metodu nebo se obraťte na svou banku. Můžete se také obrátit přímo na nás a my vám pomůžeme.",
			},
			{
				question: "Kdy mi bude částka naúčtována?",
				answer:
					"Platba se účtuje v okamžiku nákupu. U předobjednávek vám může být částka stržena při objednání nebo při odeslání zboží, podle konkrétního produktu.",
			},
		],
	},
	{
		id: "shipping",
		title: "Doprava a doručení",
		questions: [
			{
				question: "Jaké máte možnosti dopravy?",
				answer:
					"Nabízíme standardní a expresní dopravu. Dostupné způsoby a orientační doby doručení se zobrazí v pokladně podle vaší adresy.",
			},
			{
				question: "Doručujete i do zahraničí?",
				answer:
					"Ano, doručujeme do mnoha zemí světa. Mezinárodní způsoby dopravy a jejich ceny se dopočítají v pokladně podle dodací adresy.",
			},
			{
				question: "Jak mohu sledovat svou objednávku?",
				answer:
					"Po odeslání objednávky vám přijde potvrzující e-mail se sledovacím číslem a odkazem, kde si stav balíčku můžete sledovat v reálném čase.",
			},
			{
				question: "Co mám dělat, když balíček dorazí poškozený?",
				answer:
					"Pokud objednávka dorazí poškozená, vyfoťte prosím poškození a ozvěte se nám co nejdříve. Společně situaci vyřešíme co nejrychleji.",
			},
			{
				question: "Mohu sloučit více objednávek, abych ušetřil na dopravě?",
				answer:
					"Bohužel samostatné objednávky nedokážeme sloučit do jedné zásilky. Pokud se chystáte na dopravu zdarma, přidejte si vše do jediné objednávky před dokončením nákupu.",
			},
		],
	},
	{
		id: "returns",
		title: "Vrácení a výměna",
		questions: [
			{
				question: "Jaké jsou podmínky vrácení?",
				answer:
					"Zboží přijímáme zpět do 14 dnů od doručení. Výrobky musí být nepoužité, v původním obalu a ve stejném stavu, v jakém byly dodány. Podrobnosti najdete na stránce s reklamačním řádem.",
			},
			{
				question: "Jak zahájím vrácení?",
				answer:
					"Pro zahájení vrácení se ozvěte naší podpoře s číslem objednávky a důvodem vrácení. Pošleme vám návratové pokyny a v případě potřeby i zpáteční štítek pro zásilku.",
			},
			{
				question: "Jak funguje výměna zboží?",
				answer:
					"Výměna se řeší jako vrácení následované novou objednávkou. Stačí vrátit původní kus a objednat si nový kus, který chcete.",
			},
			{
				question: "Jak dlouho trvá, než mi přijde vratka?",
				answer:
					"Jakmile přijaté zboží zkontrolujeme, vrácené částky obvykle posíláme do 5–10 pracovních dnů. Vratka půjde na stejný platební prostředek, kterým jste zaplatili.",
			},
		],
	},
	{
		id: "discounts",
		title: "Slevy a akce",
		questions: [
			{
				question: "Nabízíte slevy pro nové zákazníky?",
				answer:
					"Ano! Noví zákazníci si mohou přihlásit odběr novinek a získat uvítací slevu. Přihlašovací formulář k odběru najdete na hlavní stránce.",
			},
			{
				question: "Jak uplatním slevový kód?",
				answer:
					"V pokladně najdete pole pro zadání slevového kódu. Zadejte kód a sleva se automaticky započítá do celkové ceny objednávky.",
			},
			{
				question: "Mohu použít více slevových kódů najednou?",
				answer:
					"Na jednu objednávku lze uplatnit jen jeden slevový kód. Pokud jich zadáte více, systém automaticky použije ten, který dává největší slevu.",
			},
		],
	},
];
