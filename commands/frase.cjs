const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'frase',
    aliases: ['quote', 'citacao'],
    description: 'Envia uma frase aleatória/motivacional/zoeira',
    
    slashData: new SlashCommandBuilder()
        .setName('frase')
        .setDescription('Envia uma frase aleatória/motivacional/zoeira'),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        await performQuote(message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        await performQuote(null, interaction, colors, createYakuzaEmbed);
    }
};

async function performQuote(message, interaction, colors, createYakuzaEmbed) {
    try {
        const quotes = [
            // Motivacionais
            { text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', author: 'Robert Collier', emoji: '💪' },
            { text: 'Acredite em você mesmo e tudo será possível.', author: 'Anônimo', emoji: '⭐' },
            { text: 'A única forma de fazer um excelente trabalho é amar o que você faz.', author: 'Steve Jobs', emoji: '❤️' },
            { text: 'Não espere por oportunidades, crie-as.', author: 'Anônimo', emoji: '🚀' },
            { text: 'O fracasso é apenas a oportunidade de recomeçar de novo com mais inteligência.', author: 'Henry Ford', emoji: '🎯' },
            
            // Engraçadas/Zoeira
            { text: 'Se você acha que ninguém se importa com você, tente dar calote em alguém.', author: 'Filosofia de Buteco', emoji: '😂' },
            { text: 'Dinheiro não traz felicidade... Manda buscar!', author: 'Sabedoria Popular', emoji: '💰' },
            { text: 'Eu não sou preguiçoso, eu só tenho economia de energia ativada.', author: 'Filosofia Gamer', emoji: '🎮' },
            { text: 'Café: porque ódio matinal não é saudável.', author: 'Anônimo', emoji: '☕' },
            { text: 'Se você não tem amigos imaginários, você não tem imaginação.', author: 'Filosofia Doida', emoji: '🤪' },
            { text: 'Dormir é a melhor meditação. - Dalai Lama (provavelmente)', author: 'Filosofia da Preguiça', emoji: '😴' },
            { text: 'Segunda-feira: prova de que até a semana precisa de um dia ruim.', author: 'Calendário Depressivo', emoji: '📅' },
            
            // Reflexivas
            { text: 'A vida é 10% o que acontece com você e 90% como você reage a isso.', author: 'Charles R. Swindoll', emoji: '🌟' },
            { text: 'Seja a mudança que você quer ver no mundo.', author: 'Mahatma Gandhi', emoji: '🌍' },
            { text: 'O único impossível é aquilo que você não tenta.', author: 'Anônimo', emoji: '✨' },
            
            // Zoeira hardcore BR
            { text: 'Se a vida te der limões, faz uma caipirinha e esquece os problemas.', author: 'Sabedoria Brasileira', emoji: '🍹' },
            { text: 'Não é sobre quantas vezes você cai, é sobre quantas vezes você levanta... pra pegar cerveja na geladeira.', author: 'Filosofia de Churrasco', emoji: '🍺' },
            { text: 'Sonhe alto, mas não tanto que você caia da cama.', author: 'Pensador de Sofá', emoji: '🛋️' },
            { text: 'Se você acha que estudar é difícil, tenta ser burro a vida toda.', author: 'Professor Revoltado', emoji: '📚' },
            { text: 'A pressa é inimiga da perfeição, mas a preguiça é amiga da procrastinação.', author: 'Mestre do Atraso', emoji: '⏰' },
            { text: 'Tudo tem seu tempo. Menos meu salário, que chega atrasado.', author: 'Trabalhador BR', emoji: '💸' },
            { text: 'Quem não tem cão, caça com gato. Quem não tem gato... tá fudido.', author: 'Ditado Adaptado', emoji: '🐱' },
            { text: 'O impossível é só questão de opinião. O improbável é falta de criatividade.', author: 'Pensador Aleatório', emoji: '🎭' },
            
            // Gaming/Geek
            { text: 'GG EZ - só no sonho, tá tudo difícil.', author: 'Gamer Realista', emoji: '🎮' },
            { text: 'Vida é tipo Dark Souls: você morre, aprende, e morre de novo.', author: 'Filosofia Gamer', emoji: '⚔️' },
            { text: 'Ctrl+Z não funciona na vida real, infelizmente.', author: 'Programador Frustrado', emoji: '💻' }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        const embed = createYakuzaEmbed(
            `${randomQuote.emoji} Frase Aleatória`,
            `*"${randomQuote.text}"*\n\n— **${randomQuote.author}**`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando frase:', error);
        
        const errorEmbed = createYakuzaEmbed(
            'Erro',
            'Ocorreu um erro ao executar este comando.',
            colors.error
        );
        
        if (message) {
            await message.reply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}
