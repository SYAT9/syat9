const { InteractionType, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.type !== InteractionType.ModalSubmit) return;

    const modal = client.modals.get(interaction.customId);

    if (!modal) return;

    if (modal == undefined) return;

    if (
      modal.permission &&
      !interaction.member.permissions.has(modal.permission)
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Bunu kullanmak için gerekli izinlere sahip değilsiniz.`)
            .setColor("#f8312f"),
        ],
        ephemeral: true,
      });

    if (modal.developer && interaction.user.id !== `519236223899009037` && interaction.user.id !== `390489053516005386`)//kendi id ni gir knk
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Bu model yalnızca geliştiriciler içindir.`)
            .setColor("#f8312f"),
        ],
        ephemeral: true,
      });

    modal.execute(interaction, client);

    
      }
    }
