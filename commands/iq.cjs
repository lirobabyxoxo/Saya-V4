const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'iq',
    aliases: ['qi'],
    description: 'Mede o QI do usuário',
    
    slashData: new SlashCommandBuilder()
        .setName('iq')
        .setDescription('Mede o QI do usuário')
        .addUserOption(option =>
            option.setName('usuário')
                .setDescription('Usuário para medir')
                .setRequired(false)
        ),
    
    async execute(message, args, client, config, colors, createYakuzaEmbed, emojis) {
        const target = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null) || message.author;
        await performMeter('iq', message.author, target, message, null, colors, createYakuzaEmbed);
    },
    
    async executeSlash(interaction, client, config, colors, createYakuzaEmbed, emojis) {
        const target = interaction.options.getUser('usuário') || interaction.user;
        await performMeter('iq', interaction.user, target, null, interaction, colors, createYakuzaEmbed);
    }
};

async function performMeter(type, author, target, message, interaction, colors, createYakuzaEmbed) {
    try {
        const iq = Math.floor(Math.random() * 201);
        
        let description = '';
        let emoji = '';
        
        if (iq < 50) {
            description = 'Cognitivamente desafiado 🤡';
        } else if (iq < 80) {
            description = 'Abaixo da média 😅';
        } else if (iq < 110) {
            description = 'Média 😐';
        } else if (iq < 130) {
            description = 'Acima da média 😎';
        } else if (iq < 160) {
            description = 'Inteligente 🧠';
        } else {
            description = 'Gênio absoluto! 🚀';
        }
        
        const embed = createYakuzaEmbed(
            '🧠 Medidor de QI',
            `O QI de **${target.username}** é: **${iq}**\n\n${description}`,
            colors.primary
        );
        
        if (message) {
            await message.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
        
    } catch (error) {
        console.error('Erro no comando iq:', error);
        
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
